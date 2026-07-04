import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
print(os.getenv("OPENROUTER_API_KEY"))
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def customize_resume(job_description, resume_text):

    prompt = f"""
You are an Expert ATS Resume Writer.

Your task is to customize the resume according to the Job Description.

Return the response in the following EXACT format.

# Customized Resume

## Professional Summary

(Rewrite Summary)

## Key Skills

(List skills)

## Professional Experience

(Rewrite experience)

## Projects

(Update projects if required)

## Missing Keywords

(List ONLY missing ATS keywords in bullet points)

Example:

- Redux Toolkit
- Jest
- CI/CD
- Docker
- Agile
- Unit Testing

## ATS Score Improvement

Explain how the resume was improved.

Job Description:

{job_description}

Resume:

{resume_text}
IMPORTANT:
Never skip any section.
Always include "Missing Keywords" even if only 2-3 keywords are missing.
"""

    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content