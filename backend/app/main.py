from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    Company,
    CompanyDossier,
    CopilotAnswer,
    CopilotQuestion,
    DocumentChunk,
    FinancialMetric,
    Insight,
    RagAnswer,
    RagQuestion,
    Report,
    RiskItem,
    Watchlist,
)
from .ollama_service import answer_with_rag
from .repository import (
    COMPANIES,
    INSIGHTS,
    REPORTS,
    WATCHLISTS,
    get_company,
    get_company_chunks,
    get_company_dossier,
    get_copilot_answer,
)

app = FastAPI(title="NiveshSaarthi API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "nivesh-saarthi-api"}


@app.get("/companies", response_model=list[Company])
def list_companies() -> list[Company]:
    return COMPANIES


@app.get("/companies/{company_id}", response_model=Company)
def retrieve_company(company_id: str) -> Company:
    company = get_company(company_id)
    if company is None:
        raise HTTPException(status_code=404, detail="Company not found")
    return company


@app.get("/companies/{company_id}/dossier", response_model=CompanyDossier)
def retrieve_company_dossier(company_id: str) -> CompanyDossier:
    dossier = get_company_dossier(company_id)
    if dossier is None:
        raise HTTPException(status_code=404, detail="Company dossier not found")
    return dossier


@app.get("/companies/{company_id}/metrics", response_model=list[FinancialMetric])
def retrieve_company_metrics(company_id: str) -> list[FinancialMetric]:
    dossier = get_company_dossier(company_id)
    if dossier is None:
        raise HTTPException(status_code=404, detail="Company metrics not found")
    return dossier.metrics


@app.get("/companies/{company_id}/risks", response_model=list[RiskItem])
def retrieve_company_risks(company_id: str) -> list[RiskItem]:
    dossier = get_company_dossier(company_id)
    if dossier is None:
        raise HTTPException(status_code=404, detail="Company risks not found")
    return dossier.risks


@app.get("/companies/{company_id}/chunks", response_model=list[DocumentChunk])
def retrieve_company_chunks(company_id: str) -> list[DocumentChunk]:
    chunks = get_company_chunks(company_id)
    if not chunks:
        raise HTTPException(status_code=404, detail="Company chunks not found")
    return chunks


@app.post("/companies/{company_id}/rag/ask", response_model=RagAnswer)
def ask_company_rag(company_id: str, payload: RagQuestion) -> RagAnswer:
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Question is required")

    chunks = get_company_chunks(company_id)
    if not chunks:
        raise HTTPException(status_code=404, detail="Company RAG corpus not found")

    return answer_with_rag(question, chunks)


@app.get("/reports", response_model=list[Report])
def list_reports() -> list[Report]:
    return REPORTS


@app.get("/insights", response_model=list[Insight])
def list_insights() -> list[Insight]:
    return INSIGHTS


@app.get("/watchlists", response_model=list[Watchlist])
def list_watchlists() -> list[Watchlist]:
    return WATCHLISTS


@app.post("/copilot/ask", response_model=CopilotAnswer)
def ask_copilot(payload: CopilotQuestion) -> CopilotAnswer:
    question = payload.question.strip()
    if not question:
        raise HTTPException(status_code=422, detail="Question is required")
    return get_copilot_answer(question, payload.company_id)
