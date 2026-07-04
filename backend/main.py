from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from resume_parser import extract_text_from_pdf
from gemini import customize_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.get("/")
def home():
    return {
        "message": "Resume Customizer Backend Running!"
    }


@app.post("/upload")
async def upload_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    # Extract text
    resume_text = extract_text_from_pdf(file_path)

    # Gemini AI
    customized_resume = customize_resume(
        job_description,
        resume_text
    )

    return {
        "success": True,
        "filename": resume.filename,
        "job_description": job_description,
        "resume_text": resume_text,
        "customized_resume": customized_resume
    }