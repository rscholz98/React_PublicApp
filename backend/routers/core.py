import base64
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from PyPDF2 import PdfReader
from io import BytesIO

router = APIRouter()

class RequestPrompt(BaseModel):
    prompt: str
    pdf_file: str  # Base64-encoded string of the PDF file

class ResponseModel(BaseModel):
    status_code: int
    message: str
    content: str

@router.post("/LLM/request_prompt", response_model=ResponseModel, tags=["LLM"])
async def request_prompt(data: RequestPrompt):
    
    try:
        pdf_content = base64.b64decode(data.pdf_file)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid base64-encoded file.")

    pdf_stream = BytesIO(pdf_content)

    try:
        reader = PdfReader(pdf_stream)
        text = ""
        for page_num in range(len(reader.pages)):
            text += reader.pages[page_num].extract_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error reading the PDF file.")

    response = f"LLM answer based on the prompt: {data.prompt} and PDF content: {text}"

    return ResponseModel(
        status_code=200,
        message="The record has been created successfully.",
        content=response,
    )
