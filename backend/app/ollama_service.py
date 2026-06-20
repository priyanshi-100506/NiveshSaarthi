import os
from typing import Iterable

import requests

from .models import Citation, DocumentChunk, RagAnswer

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:latest")


def retrieve_chunks(question: str, chunks: Iterable[DocumentChunk], limit: int = 4) -> list[DocumentChunk]:
    terms = {term.strip(".,?!:;()").lower() for term in question.split() if len(term) > 2}

    def score(chunk: DocumentChunk) -> int:
        haystack = f"{chunk.section} {chunk.text}".lower()
        return sum(1 for term in terms if term in haystack)

    ranked = sorted(chunks, key=score, reverse=True)
    useful = [chunk for chunk in ranked if score(chunk) > 0]
    return (useful or ranked)[:limit]


def build_fallback_answer(question: str, chunks: list[DocumentChunk]) -> str:
    evidence = " ".join(chunk.text for chunk in chunks[:3])
    return (
        "HDFC Bank's current investment read is stable but watchful. "
        "The strongest signal is that the core deposit franchise and asset-quality discipline remain central to the thesis. "
        "The main caveat is that merger integration, deposit repricing, and unsecured retail seasoning can pressure returns even when headline credit metrics look comfortable. "
        f"Relevant evidence: {evidence}"
    )


def ask_ollama(question: str, chunks: list[DocumentChunk]) -> tuple[str, str, str]:
    context = "\n\n".join(
        f"[{chunk.id}] {chunk.source}, {chunk.section}, page {chunk.page}: {chunk.text}"
        for chunk in chunks
    )
    prompt = (
        "You are NiveshSaarthi, an equity research assistant. Use only the supplied context. "
        "Write a concise analyst answer with a thesis, evidence, risks, and what to monitor. "
        "Do not give financial advice. Mention citation ids inline where useful.\n\n"
        f"Question: {question}\n\nContext:\n{context}"
    )

    try:
        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/generate",
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False, "keep_alive": "10m"},
            timeout=120,
        )
        response.raise_for_status()
        text = response.json().get("response", "").strip()
        if text:
            return text, "ollama", OLLAMA_MODEL
    except requests.RequestException:
        pass

    return build_fallback_answer(question, chunks), "fallback", "curated-rag"


def answer_with_rag(question: str, chunks: list[DocumentChunk]) -> RagAnswer:
    selected = retrieve_chunks(question, chunks)
    answer, provider, model = ask_ollama(question, selected)
    citations = [
        Citation(
            chunk_id=chunk.id,
            source=chunk.source,
            section=chunk.section,
            page=chunk.page,
            text=chunk.text,
        )
        for chunk in selected
    ]
    return RagAnswer(
        question=question,
        answer=answer,
        provider=provider,
        model=model,
        confidence="Medium" if provider == "ollama" else "Mock-backed",
        citations=citations,
        follow_ups=[
            "What metric should I monitor next quarter?",
            "What would weaken the HDFC Bank thesis?",
            "Summarize the asset-quality risk in three bullets.",
        ],
    )
