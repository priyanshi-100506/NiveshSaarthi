export type Company = {
  id: string;
  name: string;
  ticker: string;
  price: number;
  change: number;
  marketCap: string;
  pe: number;
  sector: string;
  summary: string;
  risks: string[];
  strengths: string[];
};

export type Report = {
  id: string;
  company: string;
  year: number;
  type: string;
  date: string;
};

export type Insight = {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
};

export type Watchlist = {
  id: string;
  name: string;
  company_ids: string[];
};

export type CopilotAnswer = {
  question: string;
  confidence: string;
  blocks: Array<{ title: string; body: string }>;
  follow_ups: string[];
  sources: string[];
};

export type CompanyProfile = {
  company_id: string;
  founded: string;
  headquarters: string;
  business_model: string;
  thesis: string;
  segments: string[];
  key_monitorables: string[];
};

export type FinancialMetric = {
  year: string;
  revenue: number;
  net_profit: number;
  deposits: number;
  advances: number;
  net_interest_margin: number;
  gross_npa: number;
  net_npa: number;
};

export type RiskItem = {
  id: string;
  title: string;
  severity: string;
  description: string;
  monitor: string;
};

export type DocumentChunk = {
  id: string;
  company_id: string;
  source: string;
  year: number;
  section: string;
  page: number;
  text: string;
};

export type CompanyDossier = {
  company: Company;
  profile: CompanyProfile;
  metrics: FinancialMetric[];
  risks: RiskItem[];
  chunks: DocumentChunk[];
};

export type RagAnswer = {
  question: string;
  answer: string;
  provider: string;
  model: string;
  confidence: string;
  citations: Array<{
    chunk_id: string;
    source: string;
    section: string;
    page: number;
    text: string;
  }>;
  follow_ups: string[];
};

const configuredApiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const API_BASE_URLS = Array.from(new Set([
  configuredApiBaseUrl,
  'http://127.0.0.1:8000',
  'http://localhost:8000',
  'http://127.0.0.1:8001',
  'http://localhost:8001',
  'http://127.0.0.1:8002',
  'http://localhost:8002',
  'http://127.0.0.1:8765',
  'http://localhost:8765',
  'http://127.0.0.1:9000',
  'http://localhost:9000',
]));

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let lastError: unknown;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        lastError = new Error(`API request failed at ${baseUrl}: ${response.status}`);
        continue;
      }

      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error('API request failed');
}

export const api = {
  health: () => request<{ status: string; service: string }>('/health'),
  companies: () => request<Company[]>('/companies'),
  company: (id: string) => request<Company>(`/companies/${id}`),
  companyDossier: (id: string) => request<CompanyDossier>(`/companies/${id}/dossier`),
  companyMetrics: (id: string) => request<FinancialMetric[]>(`/companies/${id}/metrics`),
  companyRisks: (id: string) => request<RiskItem[]>(`/companies/${id}/risks`),
  companyChunks: (id: string) => request<DocumentChunk[]>(`/companies/${id}/chunks`),
  askCompanyRag: (id: string, question: string) =>
    request<RagAnswer>(`/companies/${id}/rag/ask`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
  reports: () => request<Report[]>('/reports'),
  insights: () => request<Insight[]>('/insights'),
  watchlists: () => request<Watchlist[]>('/watchlists'),
  askCopilot: (question: string, companyId?: string) =>
    request<CopilotAnswer>('/copilot/ask', {
      method: 'POST',
      body: JSON.stringify({ question, company_id: companyId }),
    }),
};
