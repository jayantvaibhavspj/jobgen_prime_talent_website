// =============================================================================
// PrimeBot AI Intelligence & Recruitment Knowledge Engine
// Powered by JobGen.ai with Ashwin Shiv's 18+ Years Australian Market Authority
// =============================================================================

export const initialSuggestions = [
  "Salary rates",
  "Hire tech talent",
  "Find a tech role",
  "Book a call"
];

// Rich Multi-Domain Knowledge Base
export const knowledgeBase = [
  // --- 1. GREETINGS & INTRODUCTIONS ---
  {
    category: "greeting",
    keywords: ["hi", "hello", "hey", "gday", "g'day", "namaste", "morning", "afternoon", "evening", "who are you", "kya ho", "kaise ho", "help", "start"],
    answer: "G'day! I'm **PrimeBot**, the strategic digital copilot for **Prime Talent Solutions Pty Ltd**, powered by **JobGen.ai**.\n\nLed personally by **Ashwin Shiv** (18+ years Australian IT recruitment veteran), we specialize in **Cloud, Data & AI, and Cybersecurity** across Sydney, Melbourne, Brisbane & Canberra.\n\nHow can I help you today?",
    actions: [
      { label: "Check 2026 Salary Index ↗", to: "/salary-calculator" },
      { label: "Explore Specialisations ↗", to: "/specialisations" },
      { label: "Book Strategy Call ↗", to: "/contact" }
    ],
    suggestions: [
      "Cloud rates",
      "Find a tech role",
      "Who is Ashwin?",
      "Book a call"
    ]
  },

  // --- 2. SALARY & DAY RATES (GENERAL) ---
  {
    category: "salary_general",
    keywords: ["salary", "salaries", "day rate", "rate", "rates", "package", "remuneration", "pay", "cost", "contract rate", "kitna milta", "kitni salary", "paisa"],
    answer: "**2026 Australian tech benchmarks**\n• **Cloud Architect:** $1,200–$1,550/day\n• **DevOps / Platform:** $1,100–$1,400/day\n• **Data Engineer:** $1,200–$1,500/day\n• **Cybersecurity:** $1,300–$1,650/day\n• **GenAI / MLOps:** $1,300–$1,650/day\nPermanent salary depends on role and experience.",
    actions: [
      { label: "Open 2026 Salary Calculator ↗", to: "/salary-calculator" },
      { label: "Book Rate Calibration Call ↗", to: "/contact" }
    ],
    suggestions: [
      "DevOps Rates in Sydney vs Melbourne",
      "Snowflake Data Engineer Rates",
      "Cybersecurity Day Rates",
      "Submit a Hiring Mandate"
    ]
  },

  // --- 3. CLOUD & DEVOPS SALARY / ROLES ---
  {
    category: "cloud_devops",
    keywords: ["cloud", "devops", "platform engineer", "sre", "aws", "azure", "gcp", "kubernetes", "terraform", "site reliability"],
    answer: "**Cloud & Platform rates (Australia)**\n• Cloud Architect: $1,200–$1,550/day\n• DevOps / Platform: $1,100–$1,400/day\n• SRE: $1,150–$1,450/day\nRates vary by location, experience, and skills.",
    actions: [
      { label: "View Cloud Specialisation ↗", to: "/specialisations" },
      { label: "Calculate Cloud Salary ↗", to: "/salary-calculator" },
      { label: "Hire Cloud Talent ↗", to: "/contact" }
    ],
    suggestions: [
      "How fast can you supply DevOps contractors?",
      "Compare Sydney vs Melbourne Rates",
      "What is the 100-Day Replacement Shield?"
    ]
  },

  // --- 4. DATA & GENAI SALARY / ROLES ---
  {
    category: "data_ai",
    keywords: ["data", "snowflake", "databricks", "genai", "ai", "machine learning", "mlops", "data architect", "data engineer", "dbt", "llm"],
    answer: "**Data & AI rates (Australia)**\n• Data Engineer: $1,200–$1,500/day\n• Data Architect: $1,350–$1,700/day\n• GenAI / MLOps: $1,300–$1,650/day\nRates vary by experience and project scope.",
    actions: [
      { label: "Explore Data & AI Practice ↗", to: "/specialisations" },
      { label: "Calculate Data Rates ↗", to: "/salary-calculator" },
      { label: "Request Data Engineers ↗", to: "/contact" }
    ],
    suggestions: [
      "Hire Contract Data Engineers",
      "Are your candidates pre-vetted?",
      "Book Ashwin Shiv for Briefing"
    ]
  },

  // --- 5. CYBERSECURITY & COMPLIANCE ---
  {
    category: "cybersecurity",
    keywords: ["cyber", "security", "zero trust", "apra", "cps 234", "cps 230", "essential 8", "soc", "grc", "incident response", "ciso", "infosec"],
    answer: "**Cybersecurity rates (Australia)**\n• Security Architect: $1,300–$1,650/day\n• SecOps / Incident Response: $1,150–$1,450/day\n• GRC Consultant: $1,100–$1,400/day\nWe recruit for APRA, CPS 230, and Essential Eight requirements.",
    actions: [
      { label: "Explore Cyber Practice ↗", to: "/specialisations" },
      { label: "Deploy Cyber Mandate ↗", to: "/contact" }
    ],
    suggestions: [
      "Canberra Defense/Gov Clearance Rates",
      "How does your shortlist process work?",
      "About Ashwin Shiv (18+ Yrs)"
    ]
  },

  // --- 6. GEOGRAPHIC CITY COMPARISONS ---
  {
    category: "cities",
    keywords: ["sydney", "melbourne", "brisbane", "canberra", "perth", "location", "city", "regional", "adelaide"],
    answer: "**Indicative tech rates by city**\n• Sydney: Market baseline\n• Melbourne: Often similar to Sydney\n• Canberra: May be higher for security-cleared roles\n• Brisbane / Perth: Varies by specialty and demand\nRates depend on role, experience, and clearance.",
    actions: [
      { label: "Compare Cities on Calculator ↗", to: "/salary-calculator" },
      { label: "Book Regional Strategy Call ↗", to: "/contact" }
    ],
    suggestions: [
      "What is the day rate in Sydney?",
      "Canberra Defense Clearance Rates",
      "Contract vs Permanent Hiring"
    ]
  },

  // --- 7. HIRING PROCESS ---
  {
    category: "hiring_process",
    keywords: ["hire", "hiring", "mandate", "shortlist", "turnaround", "how fast", "guarantee", "replacement", "100 day", "fees", "margin", "pricing", "cost to hire", "kaise hire kare"],
    answer: "**How hiring works**\n1. We clarify the role and requirements.\n2. We assess candidates against the brief.\n3. You review a focused shortlist.\n4. Eligible placements include a 100-day replacement shield; terms apply.",
    actions: [
      { label: "Submit Hiring Mandate ↗", to: "/contact" },
      { label: "Explore Our 4-Step Journey ↗", to: "/specialisations" }
    ],
    suggestions: [
      "What are your placement fees?",
      "Contract vs Permanent Options",
      "Speak directly with Ashwin Shiv"
    ]
  },

  // --- 8. CANDIDATES & JOB SEEKERS ---
  {
    category: "candidate_jobs",
    keywords: ["candidate", "job", "jobs", "apply", "resume", "cv", "seeking", "looking for role", "role", "contractor", "naukri", "placement", "career", "careers"],
    answer: "**Looking for a role?**\n• Browse current openings on our Careers page.\n• Or share your CV and target role through the candidate form.\n• Your details are handled confidentially.",
    actions: [
      { label: "Browse Careers ↗", to: "/careers" },
      { label: "Submit Your Profile ↗", to: "/contact?type=candidate#action-hub" },
      { label: "Benchmark Your Salary ↗", to: "/salary-calculator" }
    ],
    suggestions: [
      "Check 2026 Tech Salary Index",
      "Browse careers",
      "Book Confidential Career Chat"
    ]
  },

  // --- 9. ABOUT ASHWIN SHIV ---
  {
    category: "ashwin_shiv",
    keywords: ["ashwin", "ashwin shiv", "director", "founder", "who is ashwin", "experience", "background", "credentials", "leadership", "kaun hai"],
    answer: "**Ashwin Shiv — Founder & Director**\n• 18+ years in technology recruitment.\n• Works with enterprise, banking, and government clients.\n• Leads candidate assessment and client engagement directly.",
    actions: [
      { label: "Read Ashwin's Full Profile ↗", to: "/about" },
      { label: "Book 15-Min Call with Ashwin ↗", to: "/contact" },
      { label: "Connect on LinkedIn ↗", href: "https://www.linkedin.com/company/prime-talent-solutions/", isExternal: true }
    ],
    suggestions: [
      "How does your shortlist process work?",
      "Sydney Parramatta HQ Location",
      "2026 Tech Salary Index"
    ]
  },

  // --- 10. WHAT IS JOBGEN.AI ---
  {
    category: "jobgen",
    keywords: ["jobgen", "jobgen.ai", "ai engine", "gobgen", "copilot", "algorithm", "technology stack"],
    answer: "**JobGen.ai supports**\n• Talent sourcing and market insights.\n• Skills-based candidate assessment.\n• Recruiter-led review for role and culture fit.",
    actions: [
      { label: "Explore Specialisations ↗", to: "/specialisations" },
      { label: "Book Strategy Call ↗", to: "/contact" }
    ],
    suggestions: [
      "How does your shortlist process work?",
      "Check 2026 Salary Index",
      "Contact Ashwin Shiv"
    ]
  },

  // --- 11. CONTACT & HEADQUARTERS ---
  {
    category: "contact_hq",
    keywords: ["contact", "phone", "mobile", "number", "email", "office", "address", "hq", "parramatta", "location", "reach", "call", "appointment"],
    answer: "**Contact Prime Talent**\n• Phone: +61 0450 173 053\n• Email: info@primetalent.com.au\n• Office: Parramatta Square, Sydney\nBook a call through the Contact page.",
    actions: [
      { label: "Direct Call: +61 0450 173 053", href: "tel:+610450173053" },
      { label: "Email info@primetalent.com.au", href: "mailto:info@primetalent.com.au" },
      { label: "Book Online Calendar ↗", to: "/contact" }
    ],
    suggestions: [
      "Submit a Hiring Mandate",
      "About Ashwin Shiv (18+ Yrs)",
      "2026 Tech Salary Index"
    ]
  },

  // --- 12. CONTRACT VS PERMANENT ---
  {
    category: "contract_vs_perm",
    keywords: ["contract vs perm", "contractor", "permanent", "perm", "fixed term", "contingent", "payroll"],
    answer: "**Contract vs permanent**\n• **Contract:** Usually paid as a day rate; suits defined or changing project needs.\n• **Permanent:** Annual salary; suits ongoing roles.\n• Pay depends on role, location, and experience.",
    actions: [
      { label: "Calculate Perm vs Contract ↗", to: "/salary-calculator" },
      { label: "Discuss Your Mandate ↗", to: "/contact" }
    ],
    suggestions: [
      "Submit a Hiring Mandate",
      "What are Cloud Architect Day Rates?",
      "Book Strategy Consultation"
    ]
  }
];

// Contextual Intelligent Matcher Engine
export function queryChatBrain(userInput, conversationHistory = []) {
  const cleanInput = userInput.trim().toLowerCase();
  
  if (!cleanInput) {
    return {
      text: "Please feel free to ask about tech salaries, day rates, candidate hiring, or connecting with Ashwin Shiv.",
      actions: [{ label: "Open Salary Index ↗", to: "/salary-calculator" }],
      suggestions: initialSuggestions
    };
  }

  // Tokenize user input into words
  const words = cleanInput.split(/[\s,?.!;:()"]+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  // Score knowledge base items
  for (const item of knowledgeBase) {
    let score = 0;

    for (const kw of item.keywords) {
      const kwLower = kw.toLowerCase();
      // Exact full match
      if (cleanInput === kwLower) {
        score += 25;
      } 
      // Substring phrase match (e.g. "day rate" in "what is the day rate")
      else if (cleanInput.includes(kwLower)) {
        score += kwLower.split(' ').length * 6;
      }

      // Word-level matching
      for (const word of words) {
        if (word.length >= 3 && kwLower.includes(word)) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // If a high-confidence match is found
  if (bestMatch && highestScore >= 4) {
    return {
      text: bestMatch.answer,
      actions: bestMatch.actions || [],
      suggestions: bestMatch.suggestions || initialSuggestions
    };
  }

  // Contextual fallback: check if user is asking a follow-up about a specific tech term
  const techTerms = [
    { term: "kubernetes", reply: "**Kubernetes / Platform roles**\n• Indicative rate: $1,200–$1,450/day\n• Varies by experience and scope." },
    { term: "aws", reply: "**AWS Architect**\n• Indicative rate: $1,250–$1,550/day\n• Varies by scope and experience." },
    { term: "azure", reply: "**Azure / Cloud Security**\n• Indicative rate: $1,200–$1,500/day\n• Varies by role and experience." },
    { term: "python", reply: "**Python Data / Backend**\n• Indicative rate: $1,100–$1,350/day\n• Depends on stack and seniority." },
    { term: "react", reply: "**Lead React / Next.js**\n• Indicative rate: $1,050–$1,300/day\n• Permanent salary depends on experience." },
    { term: "snowflake", reply: "**Snowflake Data roles**\n• Indicative rate: $1,250–$1,550/day\n• Varies by migration scope and seniority." },
    { term: "databricks", reply: "**Databricks / PySpark**\n• Indicative rate: $1,300–$1,600/day\n• Depends on project and experience." }
  ];

  for (const t of techTerms) {
    if (cleanInput.includes(t.term)) {
      return {
        text: `${t.reply}\n\nNeed a role benchmark or hiring support?`,
        actions: [
          { label: "Submit Hiring Mandate ↗", to: "/contact" },
          { label: "View Salary Index ↗", to: "/salary-calculator" }
        ],
        suggestions: [
          "What is the day rate for this role?",
          "How fast can you deliver shortlists?",
          "Book Call with Ashwin Shiv"
        ]
      };
    }
  }

  // Intelligent General Fallback
  return {
    text: "I can help with:\n• Tech salary benchmarks\n• Cloud, Data & AI, or Cyber hiring\n• Career opportunities\n• Booking a call with Ashwin Shiv\nWhat would you like to know?",
    actions: [
      { label: "Calculate 2026 Salary Index ↗", to: "/salary-calculator" },
      { label: "Deploy Hiring Mandate ↗", to: "/contact" },
      { label: "Speak with Ashwin Shiv ↗", to: "/contact" }
    ],
    suggestions: ["Cloud rates", "Data rates", "Find a tech role", "Book a call"]
  };
}
