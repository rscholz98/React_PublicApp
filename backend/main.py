from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from routers import core
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv("./.env")

REACT_APP_FE_URL = os.getenv("REACT_APP_FE_URL")
print("REACT_APP_FE_URL:", REACT_APP_FE_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[REACT_APP_FE_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(core.router)

@app.get("/")
def read_root():
    return {"Hello": "Welcome to the HSP Service Hub Backend. Enjoy your time!"}