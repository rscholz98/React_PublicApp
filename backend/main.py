from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routers import core
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv("./.env")

PYTHON_APP_FE_URL = os.getenv("PYTHON_APP_FE_URL")
print(PYTHON_APP_FE_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[PYTHON_APP_FE_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(core.router)

class ResponseModel(BaseModel):
    status_code: int
    message: str
    content: str

@app.get("/", tags=["Root"])
def read_root():
    return ResponseModel(
        status_code=200,
        message="Welcome to this fantastic app!",
        content="This is the root of the app.",
    )