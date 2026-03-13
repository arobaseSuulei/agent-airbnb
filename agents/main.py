from fastapi import FastAPI
from pydantic import BaseModel
from agent import chat

app = FastAPI()

# ============================================
# SCHEMA — ce que l'API attend en entrée
# ============================================
class MessageInput(BaseModel):
    message: str

# ============================================
# ROUTE — un seul endpoint pour le chat
# ============================================
@app.post("/chat")
def chat_endpoint(body: MessageInput):
    reponse = chat(body.message)
    return {"reponse": reponse}

# ============================================
# TEST RAPIDE — pour vérifier que l'API tourne
# ============================================
@app.get("/")
def health_check():
    return {"status": "ok", "message": "LLM Service is running"}