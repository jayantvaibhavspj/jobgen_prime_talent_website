export const roleDatasets = {
  cloud: [
    { 
      name: "Cloud Solutions Architect", 
      contract: 1350, 
      perm: 205000, 
      spread: "$1,200 – $1,550", 
      insight: "Sydney demand is strong; AWS/Azure skills may earn a premium."
    },
    { 
      name: "Lead DevOps / Platform Engineer", 
      contract: 1250, 
      perm: 185000, 
      spread: "$1,100 – $1,400", 
      insight: "Kubernetes, Terraform & GitOps skills are in extremely short supply across NSW & VIC." 
    },
    { 
      name: "Site Reliability Engineer (SRE)", 
      contract: 1300, 
      perm: 190000, 
      spread: "$1,150 – $1,450", 
      insight: "Critical for Tier-1 banks adhering to APRA CPS 230 operational risk regulations." 
    }
  ],
  data: [
    { 
      name: "Snowflake & Databricks Data Engineer", 
      contract: 1350, 
      perm: 195000, 
      spread: "$1,200 – $1,500", 
      insight: "Top 3 highest demand skill in Australia. Lakehouse migration projects driving rapid hiring." 
    },
    { 
      name: "Principal Data Architect", 
      contract: 1500, 
      perm: 220000, 
      spread: "$1,350 – $1,700", 
      insight: "Enterprise data governance, medallion architecture, and regulatory compliance expertise required." 
    },
    { 
      name: "GenAI & MLOps Specialist", 
      contract: 1450, 
      perm: 215000, 
      spread: "$1,300 – $1,650", 
      insight: "Fastest growing demand profile in 2026. Private enterprise LLM deployments surging." 
    }
  ],
  cyber: [
    { 
      name: "Zero-Trust & Cyber Security Architect", 
      contract: 1450, 
      perm: 215000, 
      spread: "$1,300 – $1,650", 
      insight: "Directly driven by APRA CPS 234 mandate enforcement and ASD Essential 8 maturity." 
    },
    { 
      name: "Lead SecOps & Incident Response", 
      contract: 1300, 
      perm: 190000, 
      spread: "$1,150 – $1,450", 
      insight: "24/7 detection and response orchestration in high demand across financial services." 
    },
    { 
      name: "GRC & Cyber Compliance Consultant", 
      contract: 1250, 
      perm: 180000, 
      spread: "$1,100 – $1,400", 
      insight: "ISO 27001, SOC 2, and Australian Privacy Principles readiness projects." 
    }
  ],
  digital: [
    { 
      name: "Enterprise Agile Program Director (SAFe)", 
      contract: 1550, 
      perm: 235000, 
      spread: "$1,400 – $1,750", 
      insight: "Multi-million dollar public sector & enterprise delivery governance." 
    },
    { 
      name: "Lead Technical Business Analyst", 
      contract: 1150, 
      perm: 170000, 
      spread: "$1,000 – $1,300", 
      insight: "Crucial translation layer between core banking API engineers and executive stakeholders." 
    },
    { 
      name: "Solution Architect (Digital Channels)", 
      contract: 1400, 
      perm: 210000, 
      spread: "$1,250 – $1,600", 
      insight: "Modern mobile and customer experience banking transformations." 
    }
  ]
};

export const sampleJobs = [
  {
    id: 1,
    domain: "cloud",
    title: "Senior AWS Cloud Architect (Multi-Region)",
    type: "Contract (12 Mo)",
    rate: "$1,350 - $1,500 / day",
    location: "Sydney CBD / Hybrid (2 days)",
    tags: ["AWS", "Terraform", "Kubernetes", "Landing Zones"],
    summary: "Lead multi-region AWS cloud modernization for top ASX-50 banking client. Direct interaction with Ashwin Shiv's exclusive delivery desk."
  },
  {
    id: 2,
    domain: "data",
    title: "Lead Databricks & Snowflake Data Engineer",
    type: "Contract (6 Mo + Ext)",
    rate: "$1,250 - $1,400 / day",
    location: "Melbourne / Remote within AU",
    tags: ["Databricks", "Snowflake", "dbt", "PySpark"],
    summary: "Architect an enterprise lakehouse pipeline for a major Australian health insurer. Immediate start."
  },
  {
    id: 3,
    domain: "cyber",
    title: "Principal Zero-Trust Security Architect",
    type: "Permanent",
    rate: "$210,000 - $240,000 + Super",
    location: "Sydney / Canberra (Hybrid)",
    tags: ["APRA CPS 234", "Zero-Trust", "ASD Essential 8", "SASE"],
    summary: "Executive-mandated cybersecurity posture uplift for federal government agency. Top-secret security clearance sponsored."
  },
  {
    id: 4,
    domain: "digital",
    title: "Agile Program Delivery Director (SAFe)",
    type: "Contract (12 Mo)",
    rate: "$1,500 - $1,750 / day",
    location: "Sydney / Barangaroo",
    tags: ["SAFe 6.0", "Core Banking", "APRA CPS 230", "Digital Transformation"],
    summary: "Steer $40M core banking customer journeys upgrade. High-visibility role reporting directly to Chief Information Officer."
  }
];
