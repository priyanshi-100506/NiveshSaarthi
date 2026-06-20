from pydantic import BaseModel, Field


class Company(BaseModel):
    id: str
    name: str
    ticker: str
    price: float
    change: float
    market_cap: str = Field(alias="marketCap")
    pe: float
    sector: str
    summary: str
    risks: list[str]
    strengths: list[str]

    model_config = {"populate_by_name": True}


class Report(BaseModel):
    id: str
    company: str
    year: int
    type: str
    date: str


class Insight(BaseModel):
    id: str
    title: str
    date: str
    category: str
    author: str
    excerpt: str


class Watchlist(BaseModel):
    id: str
    name: str
    company_ids: list[str]


class CopilotQuestion(BaseModel):
    question: str
    company_id: str | None = None


class BriefBlock(BaseModel):
    title: str
    body: str


class CopilotAnswer(BaseModel):
    question: str
    confidence: str
    blocks: list[BriefBlock]
    follow_ups: list[str]
    sources: list[str]


class CompanyProfile(BaseModel):
    company_id: str
    founded: str
    headquarters: str
    business_model: str
    thesis: str
    segments: list[str]
    key_monitorables: list[str]


class FinancialMetric(BaseModel):
    year: str
    revenue: float
    net_profit: float
    deposits: float
    advances: float
    net_interest_margin: float
    gross_npa: float
    net_npa: float


class RiskItem(BaseModel):
    id: str
    title: str
    severity: str
    description: str
    monitor: str


class Citation(BaseModel):
    chunk_id: str
    source: str
    section: str
    page: int
    text: str


class DocumentChunk(BaseModel):
    id: str
    company_id: str
    source: str
    year: int
    section: str
    page: int
    text: str


class CompanyDossier(BaseModel):
    company: Company
    profile: CompanyProfile
    metrics: list[FinancialMetric]
    risks: list[RiskItem]
    chunks: list[DocumentChunk]


class RagQuestion(BaseModel):
    question: str


class RagAnswer(BaseModel):
    question: str
    answer: str
    provider: str
    model: str
    confidence: str
    citations: list[Citation]
    follow_ups: list[str]
