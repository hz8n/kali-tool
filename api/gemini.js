const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function extractGeminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((part) => String(part?.text || "").trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const question = String(body.question || "").trim();
    const history = Array.isArray(body.history) ? body.history : [];
    const model = String(body.model || DEFAULT_MODEL).trim() || DEFAULT_MODEL;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
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
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
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
      return res.status(response.status).json({
        error: "Gemini request failed",
        details: raw.slice(0, 1500)
      });
    }

    const data = await response.json();
    const answer = extractGeminiText(data);

    if (!answer) {
      return res.status(502).json({ error: "Empty Gemini response" });
    }

    return res.status(200).json({ answer, model });
  } catch (error) {
    return res.status(500).json({
      error: "Proxy failure",
      details: String(error?.message || error)
    });
  }
}
