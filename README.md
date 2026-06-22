# NiveshSaarthi

NiveshSaarthi is an AI-powered financial research and investment auditing assistant. It enables users to research companies, view financial metrics, analyze risk factors, and interact with a Copilot and a Retrieval-Augmented Generation (RAG) system to query corporate reports and filings.

The project is structured as a fullstack application with a FastAPI backend and a React (Vite + TypeScript) frontend.

---

## Features

- **Company Intelligence**: Deep-dive corporate dossier including company profiles, key metrics, strengths, weaknesses, and risk factors.
- **Interactive Copilot and RAG**: Talk to a local AI assistant that answers queries with citations, pulling context from document chunks of company filings.
- **Financial Visualization**: Interactive charts for historical financial metrics (revenue, net income, margins, debt, cash flow, and key ratios) using Recharts.
- **Company Comparison**: Side-by-side comparison of company metrics, risks, and valuations.
- **Reports and Insights Hub**: Index of annual reports, regulatory filings, and curated analyst research insights.
- **Watchlists**: Customizable watchlists to track groups of companies.
- **Omni-Search Command Interface**: Quick-access command search overlay to navigate and query the platform.
- **Clean Architecture and SOLID Design**: Clear separation of concerns in the backend codebase with repositories, models, and service boundaries.

---

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Server**: Uvicorn
- **Language**: Python
- **LLM Integration**: Ollama (defaulting to llama3.2:latest) with httpx for async generation
- **Dependencies**: Pydantic, Python-dotenv, HTTPX

### Frontend
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Component Library**: Radix UI primitives, Lucide React icons
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Routing**: React Router DOM

---

## Repository Structure

```
NiveshSaarthi/
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoint routes
│   │   ├── services/        # Business logic services
│   │   ├── __init__.py
│   │   ├── main.py          # FastAPI application entry point
│   │   ├── mock_db.py       # In-memory mock database data
│   │   ├── models.py        # Pydantic data schemas
│   │   ├── ollama_service.py# Ollama RAG integration logic
│   │   └── repository.py    # SOLID repository pattern implementations
│   ├── requirements.txt     # Python backend dependencies
│   └── venv/                # Local Python virtual environment
├── data/
│   ├── processed/           # Processed company filing chunks
│   └── reports/             # Source PDF filings and reports
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Visual assets
│   │   ├── components/      # UI components (shadcn-ui components)
│   │   ├── context/         # React Context providers
│   │   ├── data/            # Local frontend mock data
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Shared page layouts
│   │   ├── lib/             # Utility functions and library helpers
│   │   ├── pages/           # Application views and pages
│   │   ├── services/        # API client and service calls
│   │   ├── App.tsx          # Main React App layout and routing
│   │   ├── index.css        # Global CSS stylesheet (Tailwind v4)
│   │   └── main.tsx         # React root rendering entry point
│   ├── package.json         # Frontend project manifest and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite bundler configuration
└── package.json             # Root-level dependencies
```

---

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher and npm
- Ollama (installed locally and running)

---

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**:
   - On Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - On Windows (Command Prompt):
     ```cmd
     .\venv\Scripts\activate.bat
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Ollama Integration Configuration**:
   Ensure Ollama is running on your machine:
   - Check if Ollama is running at `http://localhost:11434`.
   - Pull the default Llama 3.2 model:
     ```bash
     ollama pull llama3.2
     ```
   - You can customize the base URL and model by setting environment variables before starting the server:
     ```bash
     # Windows (PowerShell)
     $env:OLLAMA_BASE_URL="http://localhost:11434"
     $env:OLLAMA_MODEL="llama3.2:latest"
     ```

6. **Start the FastAPI server**:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`. You can view the interactive documentation at `http://localhost:8000/docs`.

---

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install the node packages**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

---

## Verification and Testing

- **Backend Health Check**: Open `http://localhost:8000/health` in your browser. It should return `{"status": "ok", "service": "nivesh-saarthi-api"}`.
- **RAG Endpoint Verification**: Send a POST request to `http://localhost:8000/companies/hdfc-bank/rag/ask` with a JSON body:
  ```json
  {
    "question": "What is the deposit franchise quality?"
  }
  ```
- **Frontend Build**: To verify compilation, run `npm run build` in the `frontend` directory.
