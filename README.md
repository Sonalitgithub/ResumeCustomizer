# Resume Customizer Web App

An AI-powered Resume Customizer Web Application built using Next.js, FastAPI, and OpenRouter AI.

The application allows users to upload their resume (PDF), enter a job description, and receive an ATS-friendly customized resume with missing keywords and optimization suggestions.

---

## Features

- Upload Resume (PDF)
- Enter Job Description
- Extract text from PDF
- AI-based Resume Customization
- ATS-friendly Resume Generation
- Missing Keywords Suggestion
- Modern Responsive UI
- FastAPI Backend
- Next.js Frontend

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- FastAPI
- Python
- pdfplumber
- OpenRouter AI
- python-dotenv

---

## Project Structure

ResumeCustomizer/
│
├── frontend/
│   ├── app/
│   ├── services/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── gemini.py
│   ├── resume_parser.py
│   ├── requirements.txt
│   └── .env
│
└── README.md

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/ResumeCustomizer.git
```

Go to project

```bash
cd ResumeCustomizer
```

---

# Frontend Setup

Go inside frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend will run on

```
http://localhost:3000
```

---

# Backend Setup

Go inside backend

```bash
cd backend
```

Create Virtual Environment

Mac/Linux

```bash
python3 -m venv venv
```

Activate Environment

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```
OPENROUTER_API_KEY=YOUR_API_KEY
```

Run Backend

```bash
uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

## API Endpoint

### Upload Resume

POST

```
/upload
```

Request

- Resume (PDF)
- Job Description

Response

- Resume Text
- Customized Resume
- Missing Keywords
- ATS Suggestions

## Workflow

1. Upload Resume PDF
2. Enter Job Description
3. Resume text is extracted
4. AI analyzes Resume
5. Resume is customized
6. Missing keywords are generated
7. ATS-friendly Resume is returned
