import { createServer } from "node:http";

const PORT = Number(process.env.PORT || 8787);
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyATyJbQUxG0H7fUYaENbKMEMrCSWquIqHU";
const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(payload));
}

function extractGeminiText(data) {
  const candidateText = data?.candidates?.[0]?.content?.parts
    ?.map((part) => String(part?.text || "").trim())
    .filter(Boolean)
    .join("\n");
  return String(candidateText || "").trim();
}

createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return sendJson(res, 204, {});
  }

  if (req.method !== "POST" || req.url !== "/api/gemini") {
    return sendJson(res, 404, { error: "Not found" });
  }

  if (!GEMINI_API_KEY) {
    return sendJson(res, 500, { error: "Missing GEMINI_API_KEY" });
  }

  try {
    const body = await readJson(req);
    const question = String(body?.question || "").trim();
    const history = Array.isArray(body?.history) ? body.history : [];
    const model = String(body?.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;

    if (!question) {
      return sendJson(res, 400, { error: "Question is required" });
    }

    const prompt = [
      "أنت مساعد تعليمي عربي داخل موقع أطلس الأمن السيبراني.",
      "أجب بإيجاز ووضوح، وركز على الشرح الدفاعي والقانوني.",
      "إذا كان السؤال خطيرًا أو هجوميًا، ارفض بلطف وقدّم بديلًا آمنًا.",
      history.length
        ? `آخر المحادثة:\n${history
            .map((item) => `سؤال: ${String(item?.question || "")}\nجواب: ${String(item?.answer || "")}`)
            .join("\n\n")}`
        : "",
      `السؤال الحالي: ${question}`
    ]
      .filter(Boolean)
      .join("\n\n");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          generationConfig: {
            temperature: 0.5,
            topP: 0.9,
            maxOutputTokens: 900
          }
        })
      }
    );

    if (!response.ok) {
      const raw = await response.text();
      return sendJson(res, response.status, {
        error: "Gemini request failed",
        details: raw.slice(0, 1500)
      });
    }

    const data = await response.json();
    const answer = extractGeminiText(data);

    if (!answer) {
      return sendJson(res, 502, { error: "Empty Gemini response" });
    }

    return sendJson(res, 200, { answer, model });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Proxy failure",
      details: String(error?.message || error)
    });
  }
}).listen(PORT, () => {
  console.log(`Gemini proxy running on http://localhost:${PORT}/api/gemini`);
});
