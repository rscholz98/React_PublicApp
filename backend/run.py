import uvicorn
from dotenv import load_dotenv
import os

load_dotenv("./.env")

if __name__ == "__main__":
    host = os.getenv("HOST", "127.0.0.1") 
    port = int(os.getenv("PORT", 8000))    
    reload = os.getenv("RELOAD", "False").lower() == "true" 
    uvicorn.run("main:app", host=host, port=port, reload=reload)