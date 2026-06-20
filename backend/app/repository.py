from .models import (
    BriefBlock,
    Company,
    CompanyDossier,
    CompanyProfile,
    CopilotAnswer,
    DocumentChunk,
    FinancialMetric,
    Insight,
    Report,
    RiskItem,
    Watchlist,
)


COMPANIES = [
    Company(
        id="reliance",
        name="Reliance Industries",
        ticker="RELIANCE",
        price=2945.35,
        change=1.25,
        marketCap="19.92T",
        pe=28.4,
        sector="Energy / Retail",
        summary="Reliance Industries is India's largest private sector company with interests across energy, retail, and digital services.",
        risks=["Oil price volatility", "Telecom competition", "Regulatory changes"],
        strengths=["Cash flow generation", "Market leadership", "Strategic investments"],
    ),
    Company(
        id="tcs",
        name="Tata Consultancy Services",
        ticker="TCS",
        price=4120.10,
        change=-0.45,
        marketCap="15.01T",
        pe=31.2,
        sector="Technology",
        summary="TCS is a global leader in IT services, consulting, and business solutions with a strong footprint in BFS and Health sectors.",
        risks=["Global slowdown", "Currency fluctuations", "Talent retention"],
        strengths=["Strong margins", "Order book visibility", "Dividend track record"],
    ),
    Company(
        id="hdfcbank",
        name="HDFC Bank",
        ticker="HDFCBANK",
        price=1650.45,
        change=0.85,
        marketCap="12.55T",
        pe=18.2,
        sector="Financial Services",
        summary="HDFC Bank is India's largest private sector bank with a robust retail and corporate banking network.",
        risks=["Interest rate cycles", "Asset quality", "Merger integration"],
        strengths=["Low-cost CASA", "Credit risk management", "Digital leadership"],
    ),
    Company(
        id="infosys",
        name="Infosys",
        ticker="INFY",
        price=1625.00,
        change=2.10,
        marketCap="6.75T",
        pe=25.5,
        sector="Technology",
        summary="Infosys is a next-generation digital services and consulting leader, helping enterprises navigate their digital transformation.",
        risks=["Discretionary spending cuts", "Visa regulations", "Competition"],
        strengths=["Large deal wins", "Cloud capabilities", "Operational efficiency"],
    ),
]

REPORTS = [
    Report(id="r1", company="RELIANCE", year=2024, type="Annual Report", date="2024-05-15"),
    Report(id="r2", company="TCS", year=2024, type="Annual Report", date="2024-04-30"),
    Report(id="r3", company="HDFCBANK", year=2024, type="Annual Report", date="2024-05-10"),
    Report(id="r4", company="RELIANCE", year=2023, type="Investor Presentation", date="2023-11-20"),
]

INSIGHTS = [
    Insight(
        id="i1",
        title="The Rise of Retail: Reliance's New Growth Engine",
        date="2024-06-10",
        category="Earnings Analysis",
        author="AI Analyst",
        excerpt="Deeper dive into how the retail segment is diversifying Reliance's cash flow profile beyond O2C.",
    ),
    Insight(
        id="i2",
        title="Tech Giants Face Margin Pressure",
        date="2024-06-08",
        category="Sector Intelligence",
        author="NiveshSaarthi Core",
        excerpt="Analyzing the impact of wage hikes and deal pricing in the Indian IT sector post-Q4 results.",
    ),
]

WATCHLISTS = [
    Watchlist(id="core", name="My Core", company_ids=["reliance", "tcs", "hdfcbank"]),
    Watchlist(id="tech", name="Tech Stocks", company_ids=["tcs", "infosys"]),
    Watchlist(id="dividend", name="Dividend Growth", company_ids=["reliance", "hdfcbank"]),
]

HDFC_PROFILE = CompanyProfile(
    company_id="hdfcbank",
    founded="1994",
    headquarters="Mumbai, Maharashtra",
    business_model=(
        "Large private-sector bank with a diversified retail, SME, wholesale, payments, and deposit franchise. "
        "The investment story depends on low-cost deposits, disciplined underwriting, branch productivity, and post-merger execution."
    ),
    thesis=(
        "HDFC Bank is best read as a quality compounding franchise where deposit growth, credit discipline, and merger integration "
        "matter more than one-quarter price movement."
    ),
    segments=["Retail banking", "Wholesale banking", "Treasury", "Payments and digital channels"],
    key_monitorables=[
        "CASA and deposit growth",
        "Net interest margin normalization",
        "Gross and net NPA direction",
        "Unsecured retail seasoning",
        "Merger integration costs and branch productivity",
    ],
)

HDFC_METRICS = [
    FinancialMetric(year="FY20", revenue=147068, net_profit=26257, deposits=1147502, advances=993703, net_interest_margin=4.3, gross_npa=1.26, net_npa=0.36),
    FinancialMetric(year="FY21", revenue=155885, net_profit=31833, deposits=1335060, advances=1132840, net_interest_margin=4.2, gross_npa=1.32, net_npa=0.40),
    FinancialMetric(year="FY22", revenue=167695, net_profit=36961, deposits=1559217, advances=1369000, net_interest_margin=4.0, gross_npa=1.17, net_npa=0.32),
    FinancialMetric(year="FY23", revenue=192800, net_profit=44109, deposits=1883400, advances=1600500, net_interest_margin=4.1, gross_npa=1.12, net_npa=0.27),
    FinancialMetric(year="FY24", revenue=307580, net_profit=64060, deposits=2379800, advances=2486900, net_interest_margin=3.5, gross_npa=1.24, net_npa=0.33),
]

HDFC_RISKS = [
    RiskItem(
        id="deposit-repricing",
        title="Deposit repricing pressure",
        severity="High",
        description="Higher funding costs can compress net interest margin before loan yields fully adjust.",
        monitor="Track CASA ratio, term-deposit mix, and NIM commentary.",
    ),
    RiskItem(
        id="merger-integration",
        title="Merger integration execution",
        severity="Medium",
        description="The HDFC Ltd merger increases balance-sheet scale but creates near-term integration and productivity complexity.",
        monitor="Track cost-to-income, branch productivity, and deposit mobilization language.",
    ),
    RiskItem(
        id="unsecured-retail",
        title="Unsecured retail seasoning",
        severity="Medium",
        description="Personal loans and cards can show stress with a lag after rapid growth or rate-cycle changes.",
        monitor="Track slippages, credit cost, and management tone on retail delinquencies.",
    ),
    RiskItem(
        id="regulatory-capital",
        title="Regulatory and capital requirements",
        severity="Medium",
        description="Banking regulation can affect growth, capital allocation, liquidity buffers, and product economics.",
        monitor="Track RBI risk-weight changes, liquidity coverage, and capital adequacy.",
    ),
]

HDFC_CHUNKS = [
    DocumentChunk(
        id="hdfc-fy24-mdna-deposits",
        company_id="hdfcbank",
        source="HDFC Bank Annual Report FY24",
        year=2024,
        section="Management Discussion - Deposits",
        page=42,
        text=(
            "Deposit mobilization remains a central management priority after the merger. The bank is focused on granular retail deposits, "
            "branch productivity, and deepening customer relationships to support sustainable loan growth."
        ),
    ),
    DocumentChunk(
        id="hdfc-fy24-mdna-asset-quality",
        company_id="hdfcbank",
        source="HDFC Bank Annual Report FY24",
        year=2024,
        section="Management Discussion - Asset Quality",
        page=47,
        text=(
            "Asset quality stayed broadly stable, with management emphasizing underwriting discipline, collections infrastructure, "
            "and close monitoring of retail portfolios including unsecured products."
        ),
    ),
    DocumentChunk(
        id="hdfc-fy24-risk-merger",
        company_id="hdfcbank",
        source="HDFC Bank Annual Report FY24",
        year=2024,
        section="Risk Factors - Integration",
        page=64,
        text=(
            "The integration of the mortgage-led business increases scale and relationship depth, while requiring careful management of systems, "
            "people, customer experience, liquidity, and operating leverage."
        ),
    ),
    DocumentChunk(
        id="hdfc-fy24-financial-nim",
        company_id="hdfcbank",
        source="HDFC Bank Annual Report FY24",
        year=2024,
        section="Financial Review - Margins",
        page=91,
        text=(
            "Net interest margin moderated as the balance sheet absorbed the merger and the funding environment remained competitive. "
            "Management expects normalization to depend on deposit growth and asset repricing."
        ),
    ),
    DocumentChunk(
        id="hdfc-fy24-capital",
        company_id="hdfcbank",
        source="HDFC Bank Annual Report FY24",
        year=2024,
        section="Capital and Liquidity",
        page=108,
        text=(
            "Capital adequacy and liquidity buffers remain important guardrails for growth. The bank continues to balance loan expansion "
            "with regulatory requirements and internal risk appetite."
        ),
    ),
]


def get_company(company_id: str) -> Company | None:
    return next((company for company in COMPANIES if company.id == company_id), None)


def get_company_dossier(company_id: str) -> CompanyDossier | None:
    company = get_company(company_id)
    if company is None or company_id != "hdfcbank":
        return None
    return CompanyDossier(
        company=company,
        profile=HDFC_PROFILE,
        metrics=HDFC_METRICS,
        risks=HDFC_RISKS,
        chunks=HDFC_CHUNKS,
    )


def get_company_chunks(company_id: str) -> list[DocumentChunk]:
    if company_id != "hdfcbank":
        return []
    return HDFC_CHUNKS


def get_copilot_answer(question: str, company_id: str | None = None) -> CopilotAnswer:
    company = get_company(company_id) if company_id else None
    subject = company.name if company else "the selected company"
    risks = ", ".join(company.risks) if company else "funding costs, execution risk, and valuation sensitivity"
    strengths = ", ".join(company.strengths) if company else "quality of earnings, management commentary, and balance-sheet resilience"

    return CopilotAnswer(
        question=question,
        confidence="Medium-high",
        blocks=[
            BriefBlock(
                title="Executive Summary",
                body=f"{subject} needs to be read through business quality first and price action second. The current signal is constructive, but not enough to ignore risk controls.",
            ),
            BriefBlock(
                title="Supporting Evidence",
                body=f"The strongest positive evidence is concentrated around {strengths}. These are useful because they can be tracked across filings and management calls.",
            ),
            BriefBlock(
                title="Risks",
                body=f"The main risks to monitor are {risks}. Any deterioration here should lower conviction before headline numbers do.",
            ),
            BriefBlock(
                title="Next Action",
                body="Compare the latest annual report, quarterly filing, and management commentary for language changes before taking a fresh position.",
            ),
        ],
        follow_ups=[
            "What changed versus the previous quarter?",
            "Which risk would change the thesis fastest?",
            "What evidence would increase conviction?",
        ],
        sources=["Annual report", "Quarterly exchange filing", "Earnings call transcript"],
    )
