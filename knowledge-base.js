(function () {
  "use strict";

  const domainCatalog = [
    {
      key: "cybersecurity",
      title: "الأمن السيبراني",
      summary: "حماية الأنظمة والبيانات والأشخاص عبر الفهم والتحليل والدفاع والاستجابة.",
      keywords: ["امن", "سيبراني", "cybersecurity", "security", "blue team", "defense"],
      links: ["#beginnerPanel", "#cyberDomainsPanel", "#quizPanel"]
    },
    {
      key: "linux",
      title: "Linux",
      summary: "بيئة عملية لفهم الملفات والصلاحيات والخدمات والأوامر والأتمتة.",
      keywords: ["linux", "bash", "terminal", "permissions", "kali", "shell"],
      links: ["#academySection", "#phishingDefensePanel", "#quizPanel"]
    },
    {
      key: "networking",
      title: "الشبكات",
      summary: "فهم انتقال البيانات والبروتوكولات والعناوين وطبقات الاتصال أمر أساسي لأي متخصص.",
      keywords: ["شبكات", "networking", "dns", "http", "tcp", "udp", "ip"],
      links: ["#academySection", "#glossaryPanel", "#cyberDomainsPanel"]
    },
    {
      key: "web",
      title: "تطوير الويب",
      summary: "بناء واجهات ومواقع منظمة يعتمد على فهم الهيكل والتنسيق والتفاعل وتجربة المستخدم.",
      keywords: ["web", "frontend", "html", "css", "javascript", "ui"],
      links: ["#frontendMasterPanel", "#academySection", "#referencesPanel"]
    },
    {
      key: "javascript",
      title: "JavaScript",
      summary: "لغة أساسية تضيف التفاعل والمنطق للواجهة وتدخل أيضًا في الخادم والتطبيقات الحديثة.",
      keywords: ["javascript", "js", "dom", "events", "async", "frontend"],
      links: ["#frontendMasterPanel", "#quizPanel", "#referencesPanel"]
    },
    {
      key: "react",
      title: "React و Next.js",
      summary: "منظومة حديثة لبناء واجهات مكونية وتطبيقات ويب أكبر وأكثر تنظيمًا.",
      keywords: ["react", "next", "nextjs", "components", "state", "tsx"],
      links: ["#frontendMasterPanel", "#referencesPanel", "#miniArticlesPanel"]
    },
    {
      key: "backend",
      title: "Backend و Full Stack",
      summary: "تصميم الـ APIs وقواعد البيانات والتوثيق والأمان وربط الواجهة بالخادم.",
      keywords: ["backend", "api", "node", "express", "sql", "database", "full stack"],
      links: ["#frontendMasterPanel", "#referencesPanel", "#quizPanel"]
    },
    {
      key: "forensics",
      title: "التحليل الجنائي و Malware",
      summary: "تحقيق مبني على الأدلة والتسلسل الزمني والسلوكيات والمؤشرات بدل التخمين.",
      keywords: ["forensics", "malware", "memory", "timeline", "evidence", "ioc"],
      links: ["#cyberDomainsPanel", "#referencesPanel", "#glossaryPanel"]
    },
    {
      key: "cloud",
      title: "Cloud و DevSecOps",
      summary: "حماية بيئات النشر والسحابة تعتمد على الهوية والأسرار والتسجيل والسياسات.",
      keywords: ["cloud", "aws", "azure", "gcp", "devsecops", "docker", "cicd"],
      links: ["#cyberDomainsPanel", "#aiCyberPanel", "#referencesPanel"]
    },
    {
      key: "ai",
      title: "الذكاء الاصطناعي",
      summary: "أداة قوية للشرح والتلخيص والتحليل والمساعدة التعليمية إذا استُخدمت بوعي وتحقيق.",
      keywords: ["ai", "ذكاء", "اصطناعي", "llm", "gemini", "prompt"],
      links: ["#aiCyberPanel", "#referencesPanel", "#missionPanel"]
    },
    {
      key: "python",
      title: "Python",
      summary: "لغة عملية للتعلم والأتمتة والتحليل وبناء الأدوات والخدمات.",
      keywords: ["python", "بايثون", "scripts", "automation", "flask", "django"],
      links: ["#academySection", "#referencesPanel", "#quizPanel"]
    },
    {
      key: "databases",
      title: "قواعد البيانات",
      summary: "تنظيم البيانات والعلاقات والاستعلامات جزء أساسي من الأنظمة الحديثة.",
      keywords: ["database", "sql", "postgres", "mysql", "mongo", "db"],
      links: ["#frontendMasterPanel", "#referencesPanel", "#glossaryPanel"]
    },
    {
      key: "career-dev",
      title: "التطوير المهني",
      summary: "التقدم المهني يحتاج مسارًا واضحًا ومشاريع وحضورًا تقنيًا منظمًا.",
      keywords: ["career", "portfolio", "cv", "interview", "job", "linkedin"],
      links: ["#miniArticlesPanel", "#referencesPanel", "#missionPanel"]
    },
    {
      key: "mobile",
      title: "تطوير وأمن الهواتف",
      summary: "فهم التطبيقات والبيئة المحمولة وتجربة المستخدم والأذونات والسلوك مهم جدًا.",
      keywords: ["mobile", "android", "ios", "app", "permissions", "mobile security"],
      links: ["#cyberDomainsPanel", "#referencesPanel", "#quizPanel"]
    }
  ];

  const topicCatalog = [
    { key: "basics", title: "الأساسيات", summary: "فهم المفاهيم الأولى واللغة العامة للمجال قبل القفز إلى الأدوات.", keywords: ["اساسيات", "مبتدئ", "مقدمة", "fundamentals"] },
    { key: "roadmap", title: "خارطة الطريق", summary: "اختيار ترتيب تعلم منطقي يقلل التشتت ويزيد سرعة التقدم.", keywords: ["roadmap", "خطة", "مسار", "ابدأ"] },
    { key: "concepts", title: "المفاهيم الجوهرية", summary: "المفاهيم الصحيحة تمنع الحفظ الأعمى وتبني فهمًا طويل الأمد.", keywords: ["concepts", "مفاهيم", "فهم", "theory"] },
    { key: "workflow", title: "سير العمل", summary: "كل مجال يحتاج خطوات منهجية واضحة بدل العمل العشوائي.", keywords: ["workflow", "خطوات", "منهجية", "process"] },
    { key: "best-practices", title: "أفضل الممارسات", summary: "الالتزام بالممارسات الصحيحة يحسن الجودة ويقلل الأخطاء.", keywords: ["best practices", "افضل", "ممارسات", "quality"] },
    { key: "mistakes", title: "الأخطاء الشائعة", summary: "رؤية الأخطاء المتكررة توفر وقتًا كبيرًا على المتعلم.", keywords: ["mistakes", "اخطاء", "مشاكل", "pitfalls"] },
    { key: "tools", title: "الأدوات", summary: "الأداة تخدم الفهم والهدف، وليست بديلًا عن المنهجية.", keywords: ["tools", "ادوات", "software", "tooling"] },
    { key: "analysis", title: "التحليل", summary: "التحليل الجيد يجمع الإشارات ويحوّلها إلى معنى وقرار.", keywords: ["analysis", "تحليل", "reasoning", "inspection"] },
    { key: "detection", title: "الكشف والرصد", summary: "الكشف يعتمد على مؤشرات وسياق وربط جيد بين الأحداث.", keywords: ["detection", "رصد", "كشف", "alerts"] },
    { key: "defense", title: "الدفاع", summary: "الدفاع الفعال طبقات وتخفيف مخاطر وليس إجراءً واحدًا.", keywords: ["defense", "حماية", "دفاع", "hardening"] },
    { key: "incident-response", title: "الاستجابة للحوادث", summary: "الاستجابة تبدأ بالتحقق والفهم ثم الاحتواء ثم التوثيق.", keywords: ["incident", "response", "استجابة", "احتواء"] },
    { key: "reporting", title: "التقارير", summary: "التقرير الجيد واضح ومحدد ويعطي صورة قابلة للتنفيذ.", keywords: ["report", "reporting", "تقارير", "documentation"] },
    { key: "career", title: "المسار المهني", summary: "النمو المهني يحتاج مهارة ومشاريع ووضوح اتجاه.", keywords: ["career", "وظيفة", "job", "portfolio"] },
    { key: "projects", title: "المشاريع", summary: "المشاريع العملية تنقل المعرفة من النظرية إلى الإتقان.", keywords: ["projects", "مشاريع", "portfolio", "practice"] },
    { key: "study-plan", title: "خطة الدراسة", summary: "التخطيط الصحيح يجعل التعلم قابلًا للاستمرار لا موسميًا.", keywords: ["study", "plan", "خطة", "مذاكرة"] },
    { key: "glossary", title: "المصطلحات", summary: "المصطلح الواضح يزيل الغموض ويعطي لغة مشتركة.", keywords: ["glossary", "مصطلحات", "terms", "vocabulary"] },
    { key: "comparison", title: "المقارنة", summary: "المقارنة الصحيحة تبرز الفروق العملية لا الشكلية فقط.", keywords: ["compare", "difference", "مقارنة", "فرق"] },
    { key: "examples", title: "الأمثلة", summary: "الأمثلة الجيدة تجعل المفهوم قابلًا للتذكر والتطبيق.", keywords: ["examples", "مثال", "امثلة", "demo"] },
    { key: "practice", title: "التطبيق العملي", summary: "التكرار الواعي والتجربة الموجهة يصنعان التقدم الحقيقي.", keywords: ["practice", "lab", "مختبر", "تطبيق"] },
    { key: "ethics", title: "الأخلاقيات والقانون", summary: "المعرفة التقنية يجب أن تبقى ضمن إطار تعليمي ودفاعي واضح.", keywords: ["ethics", "legal", "قانون", "اخلاقيات"] },
    { key: "automation", title: "الأتمتة", summary: "الأتمتة تختصر الوقت إذا سبقتها منهجية صحيحة.", keywords: ["automation", "scripts", "اتمتة", "workflow"] },
    { key: "performance", title: "الأداء", summary: "الأداء يعني سرعة وتجربة استخدام مستقرة وتنفيذًا ذكيًا.", keywords: ["performance", "speed", "optimization", "اداء"] },
    { key: "troubleshooting", title: "حل المشاكل", summary: "التشخيص الجيد يبدأ من تحديد المشكلة قبل مطاردة الحلول.", keywords: ["troubleshooting", "debug", "حل", "مشاكل"] },
    { key: "resources", title: "المراجع", summary: "اختيار مرجع واحد قوي أفضل من تشتيت الجهد بين عشرات المصادر.", keywords: ["resources", "books", "courses", "مراجع"] },
    { key: "review", title: "المراجعة والتثبيت", summary: "المراجعة الدورية تحول الفهم المؤقت إلى معرفة ثابتة.", keywords: ["review", "revision", "مراجعة", "تثبيت"] },
    { key: "architecture", title: "البنية المعمارية", summary: "فهم البنية يساعد على رؤية العلاقات بين الأجزاء بدل التعامل مع كل جزء بمعزل.", keywords: ["architecture", "design", "معمارية", "structure"] },
    { key: "deployment", title: "النشر", summary: "النشر الناجح يجمع بين الإعداد الصحيح والمتابعة والقياس بعد الإطلاق.", keywords: ["deployment", "hosting", "vercel", "نشر"] },
    { key: "configuration", title: "الإعدادات والتهيئة", summary: "التهيئة الجيدة تقلل الأخطاء وتمنح سلوكًا متوقعًا وواضحًا.", keywords: ["config", "configuration", "تهيئة", "settings"] },
    { key: "monitoring", title: "المراقبة", summary: "المراقبة تساعدك على فهم ما يحدث فعليًا بدل الاعتماد على الانطباعات.", keywords: ["monitoring", "metrics", "observability", "مراقبة"] },
    { key: "logging", title: "السجلات", summary: "السجلات ليست نصوصًا فقط، بل مصدر أساسي للفهم والتحقق والتحليل.", keywords: ["logging", "logs", "سجلات", "log"] },
    { key: "authentication", title: "الهوية والمصادقة", summary: "الهوية والمصادقة تحددان من يدخل وماذا يملك ومتى يسمح له بذلك.", keywords: ["auth", "authentication", "authorization", "هوية"] },
    { key: "validation", title: "التحقق من المدخلات", summary: "التحقق الجيد من المدخلات يحسن الاعتمادية ويقلل الأخطاء والمخاطر.", keywords: ["validation", "input", "sanitize", "تحقق"] },
    { key: "documentation", title: "التوثيق", summary: "التوثيق الذكي يختصر الوقت على الفريق ويمنع إعادة اكتشاف نفس الأشياء.", keywords: ["documentation", "docs", "توثيق", "notes"] },
    { key: "communication", title: "التواصل التقني", summary: "شرح المعلومة للآخرين جزء من الاحتراف، وليس مهارة جانبية فقط.", keywords: ["communication", "teamwork", "explain", "تواصل"] },
    { key: "mindset", title: "العقلية الصحيحة", summary: "العقلية المنهجية والصبورة أهم من مطاردة الأدوات والأسماء اللامعة.", keywords: ["mindset", "discipline", "mental model", "عقلية"] },
    { key: "interview", title: "الاستعداد للمقابلات", summary: "التحضير الجيد للمقابلات يجمع بين الفهم والمشاريع والقدرة على الشرح.", keywords: ["interview", "job", "مقابلة", "وظيفة"] },
    { key: "security", title: "الأمان", summary: "الأمان ليس طبقة لاحقة فقط، بل طريقة تفكير في البناء والتشغيل والحماية.", keywords: ["security", "hardening", "secure", "امان"] },
    { key: "privacy", title: "الخصوصية", summary: "الخصوصية تتعلق بالحد الأدنى من البيانات والوصول والوضوح في المعالجة.", keywords: ["privacy", "data", "خصوصية", "personal data"] },
    { key: "ux", title: "تجربة المستخدم", summary: "التجربة الجيدة واضحة وسريعة وسهلة الفهم والتنقل.", keywords: ["ux", "ui", "experience", "تجربة"] },
    { key: "testing", title: "الاختبارات", summary: "الاختبارات تمنح ثقة أعلى وتقلل الأعطال والانكسارات غير المتوقعة.", keywords: ["testing", "tests", "qa", "اختبار"] },
    { key: "debugging", title: "التصحيح", summary: "التصحيح الفعال يعتمد على الملاحظة والفرضيات والتدرج لا العشوائية.", keywords: ["debugging", "debug", "تصحيح", "errors"] },
    { key: "maintainability", title: "القابلية للصيانة", summary: "كلما كان النظام أوضح وأبسط، كانت صيانته وتطويره أسهل.", keywords: ["maintainability", "refactor", "صيانة", "وضوح"] },
    { key: "scalability", title: "التوسع", summary: "التوسع يعني أن يبقى النظام مفهومًا وفعالًا عندما يكبر الحمل أو الفريق.", keywords: ["scalability", "scale", "توسع", "growth"] },
    { key: "reliability", title: "الاعتمادية", summary: "الاعتمادية تعني ثباتًا متوقعًا وتعافيًا جيدًا عند المشاكل.", keywords: ["reliability", "availability", "stability", "اعتمادية"] },
    { key: "governance", title: "الحوكمة", summary: "الحوكمة تربط العمل بالسياسات والمسؤوليات والالتزام.", keywords: ["governance", "policy", "grc", "حوكمة"] },
    { key: "compliance", title: "الامتثال", summary: "الامتثال يترجم المتطلبات والمعايير إلى ممارسات قابلة للتحقق.", keywords: ["compliance", "controls", "امتثال", "standards"] },
    { key: "threats", title: "التهديدات", summary: "فهم التهديدات يساعد على ترتيب الأولويات بدل محاولة حماية كل شيء بنفس الدرجة.", keywords: ["threats", "attack", "risks", "تهديدات"] },
    { key: "recovery", title: "التعافي", summary: "التعافي الجيد يختصر الخسائر ويعيد الخدمة بسرعة ووضوح.", keywords: ["recovery", "backup", "restore", "تعافي"] },
    { key: "productivity", title: "الإنتاجية", summary: "الإنتاجية الذكية تعني إنجازًا أفضل بقرارات وأدوات أقل.", keywords: ["productivity", "focus", "workflow", "انتاجية"] },
    { key: "research", title: "البحث والاستكشاف", summary: "البحث الجيد يبدأ بسؤال واضح ثم جمع منظم للمعلومات وفرزها.", keywords: ["research", "investigation", "استكشاف", "بحث"] }
  ];

  const lensCatalog = [
    {
      key: "what",
      title: "ما هو",
      questionPrefix: "ما هو",
      answer(domain, topic, level) {
        return `في مجال ${domain.title}، موضوع ${topic.title} على مستوى ${level.label} يعني ببساطة: ${topic.summary} داخل سياق ${domain.summary}`;
      }
    },
    {
      key: "why",
      title: "لماذا هو مهم",
      questionPrefix: "لماذا",
      answer(domain, topic, level) {
        return `${topic.title} مهم في ${domain.title} لأنه يساعد على ${level.value} الفهم والتنفيذ واتخاذ القرار بشكل أوضح، خصوصًا عندما تربط الفكرة بالتطبيق لا بالحفظ فقط.`;
      }
    },
    {
      key: "how",
      title: "كيف تتعامل معه",
      questionPrefix: "كيف",
      answer(domain, topic, level) {
        return `أفضل طريقة للتعامل مع ${topic.title} في ${domain.title} هي أن تبدأ من المفهوم، ثم ترى مثالًا بسيطًا، ثم تطبق خطوة صغيرة، ثم تراجع الأخطاء الشائعة قبل الانتقال للمستوى التالي ${level.label}.`;
      }
    },
    {
      key: "beginner",
      title: "من أين أبدأ",
      questionPrefix: "من أين أبدأ",
      answer(domain, topic, level) {
        return `إذا كنت تبدأ في ${domain.title} من خلال ${topic.title}، فابدأ بفهم الأساس، ثم مصطلحين أو ثلاثة فقط، ثم مثال تطبيقي صغير، ثم راجع مرجعًا واحدًا موثوقًا. هذا مناسب خصوصًا لمستوى ${level.label}.`;
      }
    },
    {
      key: "mistake",
      title: "ما الخطأ الشائع",
      questionPrefix: "ما الخطأ",
      answer(domain, topic, level) {
        return `الخطأ الشائع في ${topic.title} داخل ${domain.title} هو القفز إلى الأداة أو المصطلح قبل فهم الهدف والسياق. لذلك الأفضل دائمًا أن تربط ${topic.title} بما تحاول حله فعليًا.`;
      }
    },
    {
      key: "compare",
      title: "كيف أقارنه",
      questionPrefix: "ما الفرق",
      answer(domain, topic, level) {
        return `عند مقارنة ${topic.title} داخل ${domain.title} بموضوع قريب منه، ركز على: الهدف، المدخلات، المخرجات، ومتى تستخدم كل واحد. هذه المقارنة تصبح أوضح كلما زاد مستواك إلى ${level.label}.`;
      }
    },
    {
      key: "next",
      title: "ما الخطوة التالية",
      questionPrefix: "ما الخطوة التالية",
      answer(domain, topic, level) {
        return `بعد فهم ${topic.title} في ${domain.title}، الخطوة التالية المناسبة هي الانتقال إلى مثال عملي أو مشروع صغير أو مراجعة مختصرة، ثم تثبيت المفهوم بأسئلة ذاتية قبل التوسع أكثر.`;
      }
    },
    {
      key: "problem-solving",
      title: "كيف أحل المشاكل فيه",
      questionPrefix: "كيف أحل المشاكل",
      answer(domain, topic, level) {
        return `في ${domain.title}، حل المشاكل المتعلقة بـ ${topic.title} يبدأ بتحديد ما الذي لا يعمل بالضبط، ثم فصل الأسباب المحتملة، ثم اختبار فرضية واحدة كل مرة، ثم توثيق ما تغيّر. هذا مهم جدًا في مستوى ${level.label}.`;
      }
    },
    {
      key: "signals",
      title: "ما العلامات المهمة",
      questionPrefix: "ما العلامات",
      answer(domain, topic, level) {
        return `العلامات المهمة في ${topic.title} داخل ${domain.title} غالبًا تكون: تغيّر متوقع أو غير متوقع، سلوك متكرر، مؤشر يدل على السبب، وفجوة بين ما يجب أن يحدث وما يحدث فعليًا.`;
      }
    },
    {
      key: "real-use",
      title: "أين يستخدم عمليًا",
      questionPrefix: "أين يستخدم",
      answer(domain, topic, level) {
        return `يُستخدم ${topic.title} عمليًا في ${domain.title} عندما تحتاج إلى تنظيم الفهم أو تنفيذ مهمة أو تفسير نتيجة أو اتخاذ قرار تقني واضح. قوته تظهر أكثر عندما تربطه بسيناريو حقيقي بدل بقائه مصطلحًا معزولًا.`;
      }
    },
    {
      key: "improve",
      title: "كيف أتحسن فيه",
      questionPrefix: "كيف أتحسن",
      answer(domain, topic, level) {
        return `للتحسن في ${topic.title} ضمن ${domain.title}، كرر دورة بسيطة: افهم الفكرة، طبّقها في مثال صغير، راجع الخطأ، ثم اشرحها بكلماتك. هذا الأسلوب أقوى من جمع المحتوى بدون ممارسة.`;
      }
    },
    {
      key: "benefits",
      title: "ما الفائدة منه",
      questionPrefix: "ما الفائدة",
      answer(domain, topic, level) {
        return `فائدة ${topic.title} في ${domain.title} أنه يحول الفهم إلى خطوات أوضح وقرارات أدق، ويمنعك من العمل العشوائي خصوصًا على مستوى ${level.label}.`;
      }
    },
    {
      key: "when",
      title: "متى أستخدمه",
      questionPrefix: "متى أستخدم",
      answer(domain, topic, level) {
        return `استخدم ${topic.title} في ${domain.title} عندما تحتاج إلى فهم أو تنفيذ أو تقييم شيء مرتبط مباشرة بهدفك الحالي، لا لمجرد أنه مشهور فقط.`;
      }
    },
    {
      key: "avoid",
      title: "ما الذي أتجنبه",
      questionPrefix: "ما الذي أتجنبه",
      answer(domain, topic, level) {
        return `في ${topic.title} ضمن ${domain.title}، تجنب القفز إلى التعقيد مبكرًا، وتجنب جمع الأدوات أو المصطلحات بدون هدف أو استخدام حقيقي.`;
      }
    },
    {
      key: "questions",
      title: "ما الأسئلة المهمة",
      questionPrefix: "ما الأسئلة المهمة",
      answer(domain, topic, level) {
        return `الأسئلة المهمة حول ${topic.title} في ${domain.title} هي: ما الهدف؟ ما المدخلات؟ ما المخرجات؟ ما المؤشرات؟ وما الخطوة التالية إذا نجح أو فشل ما أعمل عليه؟`;
      }
    },
    {
      key: "resources-lens",
      title: "بأي مرجع أبدأ",
      questionPrefix: "بأي مرجع أبدأ",
      answer(domain, topic, level) {
        return `ابدأ في ${topic.title} ضمن ${domain.title} بمرجع واحد واضح ومناسب لمستواك ${level.label}، ثم انتقل إلى مثال أو مشروع صغير قبل إضافة مصادر أخرى.`;
      }
    },
    {
      key: "career-lens",
      title: "كيف يفيدني مهنيًا",
      questionPrefix: "كيف يفيدني مهنيا",
      answer(domain, topic, level) {
        return `${topic.title} داخل ${domain.title} يفيدك مهنيًا لأنه يبني لديك لغة أو مهارة أو طريقة تفكير تظهر بوضوح في المشاريع والمقابلات والعمل الحقيقي.`;
      }
    }
  ];

  const levelCatalog = [
    { key: "beginner", label: "مبتدئ", value: "بناء" },
    { key: "intermediate", label: "متوسط", value: "تنظيم" },
    { key: "advanced", label: "متقدم", value: "تعميق" },
    { key: "professional", label: "احترافي", value: "ربط" },
    { key: "expert", label: "خبير", value: "تفسير" }
  ];

  const buildKeywords = (domain, topic, lens, level) =>
    Array.from(
      new Set(
        []
          .concat(domain.keywords || [])
          .concat(topic.keywords || [])
          .concat([domain.title, topic.title, lens.title, lens.questionPrefix, level.label, domain.key, topic.key])
          .map((item) => String(item || "").toLowerCase().trim())
          .filter(Boolean)
      )
    );

  const buildNext = (domain, topic, level) =>
    `إذا أردت التوسع، اربط ${topic.title} بمثال واحد عملي في ${domain.title} ثم قيّم فهمك على مستوى ${level.label} بدل الانتقال العشوائي لموضوع جديد.`;

  const knowledgeBase = [];

  domainCatalog.forEach((domain) => {
    topicCatalog.forEach((topic) => {
      lensCatalog.forEach((lens) => {
        levelCatalog.forEach((level) => {
          knowledgeBase.push({
            topic: `${domain.key}-${topic.key}-${lens.key}-${level.key}`,
            source: "atlas-massive-kb",
            keywords: buildKeywords(domain, topic, lens, level),
            answer: `${lens.answer(domain, topic, level)}\nمثال سريع: في ${domain.title}، يمكن فهم ${topic.title} عبر تطبيق صغير أو سؤال مباشر أو مراجعة مصطلح أساسي قبل التوسع.`,
            next: buildNext(domain, topic, level),
            links: domain.links
          });
        });
      });
    });
  });

  window.ATLAS_KB = knowledgeBase;
  window.ATLAS_KB_META = {
    count: knowledgeBase.length,
    domains: domainCatalog.length,
    topics: topicCatalog.length,
    lenses: lensCatalog.length,
    levels: levelCatalog.length
  };
})();
