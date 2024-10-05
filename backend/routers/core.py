import base64
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

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
    # Decode the base64-encoded PDF file
    try:
        pdf_content = base64.b64decode(data.pdf_file)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid base64-encoded file.")

    response = "LLM answer based on the prompt and PDF content"  # Simulate an LLM response

    return ResponseModel(
        status_code=200,
        message="The record has been created successfully.",
        content=response,
    )
