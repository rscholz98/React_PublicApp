from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from routers import core
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv("./backend.env")

FE_URL = os.getenv("FE_URL")
print(FE_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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