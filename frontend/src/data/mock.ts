export const companies = [
  {
    id: "reliance",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    price: 2945.35,
    change: 1.25,
    marketCap: "19.92T",
    pe: 28.4,
    sector: "Energy / Retail",
    summary: "Reliance Industries is India's largest private sector company with interests across energy, retail, and digital services.",
    risks: ["Oil price volatility", "Telecom competition", "Regulatory changes"],
    strengths: ["Cash flow generation", "Market leadership", "Strategic investments"]
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    price: 4120.10,
    change: -0.45,
    marketCap: "15.01T",
    pe: 31.2,
    sector: "Technology",
    summary: "TCS is a global leader in IT services, consulting, and business solutions with a strong footprint in BFS and Health sectors.",
    risks: ["Global slowdown", "Currency fluctuations", "Talent retention"],
    strengths: ["Strong margins", "Order book visibility", "Dividend track record"]
  },
  {
    id: "hdfcbank",
    name: "HDFC Bank",
    ticker: "HDFCBANK",
    price: 1650.45,
    change: 0.85,
    marketCap: "12.55T",
    pe: 18.2,
    sector: "Financial Services",
    summary: "HDFC Bank is India's largest private sector bank with a robust retail and corporate banking network.",
    risks: ["Interest rate cycles", "Asset quality", "Merger integration"],
    strengths: ["Low-cost CASA", "Credit risk management", "Digital leadership"]
  },
  {
    id: "infosys",
    name: "Infosys",
    ticker: "INFY",
    price: 1625.00,
    change: 2.10,
    marketCap: "6.75T",
    pe: 25.5,
    sector: "Technology",
    summary: "Infosys is a next-generation digital services and consulting leader, helping enterprises navigate their digital transformation.",
    risks: ["Discretionary spending cuts", "Visa regulations", "Competition"],
    strengths: ["Large deal wins", "Cloud capabilities", "Operational efficiency"]
  }
];

export const chatMessages = [
  {
    id: "1",
    role: "assistant",
    content: "Namaste! I'm NiveshSaarthi, your AI Investment Guide for Indian Markets. How can I help you today?",
    timestamp: new Date().toISOString(),
  }
];

export const reports = [
  { id: "r1", company: "RELIANCE", year: 2024, type: "Annual Report", date: "2024-05-15" },
  { id: "r2", company: "TCS", year: 2024, type: "Annual Report", date: "2024-04-30" },
  { id: "r3", company: "HDFCBANK", year: 2024, type: "Annual Report", date: "2024-05-10" },
  { id: "r4", company: "RELIANCE", year: 2023, type: "Investor Presentation", date: "2023-11-20" },
];

export const insights = [
  {
    id: "i1",
    title: "The Rise of Retail: Reliance's New Growth Engine",
    date: "2024-06-10",
    category: "Earnings Analysis",
    author: "AI Analyst",
    excerpt: "Deeper dive into how the retail segment is diversifying Reliance's cash flow profile beyond O2C."
  },
  {
    id: "i2",
    title: "Tech Giants Face Margin Pressure",
    date: "2024-06-08",
    category: "Sector Intelligence",
    author: "NiveshSaarthi Core",
    excerpt: "Analyzing the impact of wage hikes and deal pricing in the Indian IT sector post-Q4 results."
  }
];

export const agents = [
  { id: "planner", name: "Planner Agent", status: "idle", activeTask: "Waiting for goal..." },
  { id: "researcher", name: "Researcher Agent", status: "running", activeTask: "Scanning NSE financial filings..." },
  { id: "analyst", name: "Financial Analyst", status: "idle", activeTask: "Idle" },
  { id: "validator", name: "Risk Validator", status: "idle", activeTask: "Idle" }
];

export const pipelineSteps = [
  { id: "1", title: "Initialize Research Project", status: "completed" },
  { id: "2", title: "Query NSE Stock Databases", status: "completed" },
  { id: "3", title: "Analyze Profit Margin Volatility", status: "running" },
  { id: "4", title: "Evaluate Risk Factors & Governance", status: "pending" },
  { id: "5", title: "Generate Structured Investment Brief", status: "pending" }
];

export const terminalLogs = [
  { id: "1", timestamp: "10:24:15", type: "system", message: "SYSTEM: Booting multi-agent environment..." },
  { id: "2", timestamp: "10:24:16", type: "agent", message: "PLANNER: Project initialized. Target: RELIANCE / INFOSYS." },
  { id: "3", timestamp: "10:24:18", type: "command", message: "$ fetch-sec-data --ticker=RELIANCE --period=Q4FY24" },
  { id: "4", timestamp: "10:24:20", type: "system", message: "SYSTEM: Connected to NSE Data Hub. Payload received." },
  { id: "5", timestamp: "10:24:21", type: "agent", message: "RESEARCHER: Found 4 annual reports and 12 investor presentations." },
  { id: "6", timestamp: "10:24:25", type: "command", message: "$ extract-margins --target=O2C_margins,retail_growth" },
  { id: "7", timestamp: "10:24:28", type: "agent", message: "ANALYST: Margin compression detected in O2C. Offset by Retail expansion." },
];

export const agentArtifacts = [
  { name: "reliance_q4_metrics.json", size: "12KB", type: "json" },
  { name: "margin_comparison.csv", size: "4.8KB", type: "csv" },
  { name: "investment_brief_draft.md", size: "15KB", type: "markdown" },
  { name: "risk_exposure_matrix.png", size: "450KB", type: "image" }
];

