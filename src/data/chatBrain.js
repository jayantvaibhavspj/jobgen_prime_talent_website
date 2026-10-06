// =============================================================================
// PrimeBot AI Intelligence & Recruitment Knowledge Engine
// Powered by JobGen.ai with Ashwin Shiv's 18+ Years Australian Market Authority
// =============================================================================

export const initialSuggestions = [
  "2026 Tech Salary Index",
  "Hire Cloud / DevOps Talent",
  "About Ashwin Shiv (18+ Yrs)",
  "How does your shortlist process work?",
  "Book Strategy Consultation"
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
      "What is the day rate for Cloud Architects?",
      "How fast can you deliver candidates?",
      "Who is Ashwin Shiv?",
      "I want to submit my resume"
    ]
  },

  // --- 2. SALARY & DAY RATES (GENERAL) ---
  {
    category: "salary_general",
    keywords: ["salary", "day rate", "rate", "rates", "package", "remuneration", "pay", "cost", "contract rate", "kitna milta", "kitni salary", "paisa"],
    answer: "Australian tech day rates remain resilient in 2026, driven by critical modernization, AI adoption, and APRA compliance mandates:\n\n• **Cloud Solutions Architects**: $1,200 – $1,550/day ($185k – $240k perm)\n• **Lead DevOps / Platform Engineers**: $1,100 – $1,400/day ($170k – $210k perm)\n• **Snowflake / Databricks Data Engineers**: $1,200 – $1,500/day ($175k – $215k perm)\n• **Cybersecurity & Zero-Trust Architects**: $1,300 – $1,650/day ($195k – $245k perm)\n• **GenAI & MLOps Specialists**: $1,300 – $1,650/day ($195k – $240k perm)\n\nSydney and Canberra command a 5–10% premium for specialized security clearances.",
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
    answer: "**Cloud & Platform Engineering 2026 Benchmarks (Australia)**:\n\n• **Cloud Solutions Architect**: $1,200 – $1,550/day (Perm: $185,000 – $240,000)\n• **Lead DevOps / Platform Engineer**: $1,100 – $1,400/day (Perm: $170,000 – $210,000)\n• **Site Reliability Engineer (SRE)**: $1,150 – $1,450/day (Perm: $175,000 – $220,000)\n\n*Key Driver*: High enterprise demand across Sydney and Melbourne banking hubs. Multi-cloud AWS/Azure certification combined with Terraform and Kubernetes commands an instant 15% rate premium.",
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
    answer: "**Data & Artificial Intelligence 2026 Benchmarks (Australia)**:\n\n• **Snowflake & Databricks Data Engineer**: $1,200 – $1,500/day (Perm: $175,000 – $215,000)\n• **Principal Data Architect**: $1,350 – $1,700/day (Perm: $200,000 – $250,000)\n• **GenAI & MLOps Specialist**: $1,300 – $1,650/day (Perm: $195,000 – $240,000)\n\n*Key Driver*: Lakehouse migrations and enterprise private LLM deployments are creating massive demand. We maintain a network of pre-vetted Snowflake and Databricks specialists.",
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
    answer: "**Cybersecurity & Governance 2026 Benchmarks (Australia)**:\n\n• **Zero-Trust & Cyber Security Architect**: $1,300 – $1,650/day (Perm: $195,000 – $245,000)\n• **Lead SecOps & Incident Response**: $1,150 – $1,450/day (Perm: $170,000 – $210,000)\n• **GRC & Cyber Compliance Consultant**: $1,100 – $1,400/day (Perm: $160,000 – $200,000)\n\n*Compliance Authority*: Every Prime mandate is aligned with **APRA CPS 234, CPS 230**, and the Australian Cyber Security Centre (ACSC) Essential 8 maturity frameworks. We supply NV1 and Baseline cleared security specialists across Sydney and Canberra.",
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
    answer: "**Australian Tech Remuneration Index by Geography (2026)**:\n\n• **Sydney (NSW)**: 100% (Market baseline — highest contractor volume across banking & fintech)\n• **Melbourne (VIC)**: 96% – 98% (Strong digital retail, healthtech, and platform engineering)\n• **Canberra (ACT)**: 104% – 110% (Substantial rate premium for NV1 / NV2 security clearance & federal mandates)\n• **Brisbane (QLD)**: 92% – 95% (Fast-growing cloud migration & public enterprise)\n• **Perth (WA)**: 98% – 102% (High demand for SCADA, cloud infrastructure & resource tech)",
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
    answer: "**Prime Talent Enterprise Engagement Model**:\n\n1. **Calibrated Shortlists**: Candidate profiles are assessed against the role brief, technical requirements, and team needs.\n2. **100-Day Replacement Shield**: If any placed contractor or permanent staff departs or underperforms within 100 days, we replace them immediately at zero additional cost.\n3. **JobGen.ai Pre-Screening**: Every candidate is evaluated through algorithmic technical rubrics combined with Ashwin Shiv's 18+ years of industry discretion.\n4. **Engagement Types**: Daily rate contract augmentations, fixed-term project teams, and executive search.",
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
    keywords: ["candidate", "job", "jobs", "apply", "resume", "cv", "seeking", "looking for role", "contractor", "naukri", "placement", "career"],
    answer: "**Candidate Strategic Pathway**:\n\nWe partner with top 1% Australian IT specialists in **Cloud, Data & AI, and Cybersecurity** for high-impact contract mandates ($1,100 – $1,800/day) and leadership permanent roles ($180k – $280k).\n\nTo be considered for confidential Tier-1 banking, government, and enterprise roles:\n• Submit your CV or LinkedIn profile directly through our strategic portal\n• Ashwin Shiv's team will conduct a discreet market rate appraisal and align you with live mandates.",
    actions: [
      { label: "Submit Candidate Briefing ↗", to: "/contact" },
      { label: "Benchmark Your Salary ↗", to: "/salary-calculator" }
    ],
    suggestions: [
      "Check 2026 Tech Salary Index",
      "Practice Verticals We Hire In",
      "Book Confidential Career Chat"
    ]
  },

  // --- 9. ABOUT ASHWIN SHIV ---
  {
    category: "ashwin_shiv",
    keywords: ["ashwin", "ashwin shiv", "director", "founder", "who is ashwin", "experience", "background", "credentials", "leadership", "kaun hai"],
    answer: "**Ashwin Shiv — Director & Founder, Prime Talent Solutions**\n\n• **18+ Years Experience**: Deeply entrenched in the Australian technology recruitment landscape since 2007.\n• **Track Record**: Personally placed over 1,200+ elite engineers, architects, and technology executives across Sydney, Melbourne, and Canberra.\n• **Enterprise Trust**: Longstanding strategic talent partner to top ANZ banks, ASX 50 enterprises, and federal government departments.\n• **Philosophy**: Eliminating recruitment agency friction by personally validating candidate rubrics with precision and speed.",
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
    answer: "**JobGen.ai Integration**:\n\nPrime Talent Solutions is co-powered by **JobGen.ai**, an autonomous talent sourcing and algorithmic market indexing engine.\n\n• **Market Calibration**: Real-time aggregation of Australian tech day rates, salary trends, and candidate liquidity.\n• **Precision Rubrics**: Deep technical skill verification (e.g., AWS multi-region architectures, Databricks medallion patterns, APRA CPS 234 frameworks).\n• **Human + AI Hybrid**: JobGen.ai accelerates data intelligence; Ashwin Shiv personally guarantees candidate cultural alignment and executive fit.",
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
    answer: "**Prime Talent Solutions Pty Ltd — Direct Contact Authority**:\n\n• **Sydney HQ**: Level 49, 8 Parramatta Square, Sydney NSW 2150\n• **Director Phone**: **+61 0450 173 053**\n• **Official Email**: **info@primetalent.com.au**\n• **Corporate Registration**: ABN 89 678 123 456\n• **Consultation**: 15-minute direct strategy briefings available with Ashwin Shiv.",
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
    answer: "**Contract vs Permanent Hiring in Australia 2026**:\n\n• **Contract Mandates (Daily Rates)**:\n  - Flexibility: Ideal for cloud migrations, ERP upgrades, or APRA audits.\n  - Rates: $1,100 – $1,650 AUD/day + GST.\n\n• **Permanent Placement (Base + Super)**:\n  - Longevity: Strategic core leadership and long-term product stewardship.\n  - 100-Day Replacement Shield on all permanent hires.\n  - Packages: $170k – $260k + Super + Equity.",
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
    { term: "kubernetes", reply: "Kubernetes and Platform Engineering are among the highest demanded skills in Australia ($1,200 – $1,450/day). We work with a network of pre-vetted engineers." },
    { term: "aws", reply: "AWS Multi-Region and Well-Architected Certified Solutions Architects command $1,250 – $1,550/day across Sydney and Melbourne banking sectors." },
    { term: "azure", reply: "Azure Enterprise Architects and Cloud Security engineers are in surging demand across APRA-regulated institutions, commanding $1,200 – $1,500/day." },
    { term: "python", reply: "Senior Python Data & Backend Engineers with FastAPI, Spark, and AWS experience command $1,100 – $1,350/day in Australia." },
    { term: "react", reply: "Lead React & Next.js engineers specializing in enterprise design systems command $1,050 – $1,300/day ($165k – $195k permanent base)." },
    { term: "snowflake", reply: "Snowflake certified Data Architects and Migration Engineers command $1,250 – $1,550/day. We work with a network of pre-vetted specialists." },
    { term: "databricks", reply: "Databricks Lakehouse & PySpark Engineers command $1,300 – $1,600/day across Australian financial and retail enterprises." }
  ];

  for (const t of techTerms) {
    if (cleanInput.includes(t.term)) {
      return {
        text: `**${t.term.toUpperCase()} Specialized Insight**:\n\n${t.reply}\n\nWould you like to review verified candidate profiles or discuss your mandate with Ashwin Shiv?`,
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
    text: "Prime Talent Solutions specializes exclusively in **Cloud, Data & AI, and Cybersecurity** for Australian enterprises, led personally by **Ashwin Shiv** (18+ years industry veteran).\n\nWe provide:\n• Carefully calibrated candidate shortlists\n• **100-Day Replacement Shield**\n• Comprehensive **2026 Tech Salary & Day Rate Benchmarking**\n\nHow can we best assist your project or career goals?",
    actions: [
      { label: "Calculate 2026 Salary Index ↗", to: "/salary-calculator" },
      { label: "Deploy Hiring Mandate ↗", to: "/contact" },
      { label: "Speak with Ashwin Shiv ↗", to: "/contact" }
    ],
    suggestions: [
      "Cloud & DevOps Day Rates",
      "Snowflake Data Engineer Rates",
      "About Ashwin Shiv (18+ Yrs)",
      "Direct HQ Phone Number"
    ]
  };
}
