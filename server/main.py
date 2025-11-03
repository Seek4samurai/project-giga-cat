from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from eth_account.messages import encode_defunct
from eth_account import Account
import jwt, secrets, time

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET = "supersecret"
nonces = {}


class Wallet(BaseModel):
    address: str


class Verify(BaseModel):
    address: str
    signature: str


@app.post("/nonce")
def nonce(data: Wallet):
    nonce = secrets.token_hex(8)
    nonces[data.address.lower()] = nonce

    return {"nonce": nonce}


@app.post("/verify")
def verify(data: Verify):
    stored = nonces.get(data.address.lower())

    if not stored:
        return {"error": "No nonce"}

    msg = encode_defunct(text=stored)
    recovered = Account.recover_message(msg, signature=data.signature)

    if recovered.lower() != data.address.lower():
        return {"error": "Invalid signature"}

    token = jwt.encode(
        {"sub": data.address, "exp": time.time() + 3600}, SECRET, algorithm="HS256"
    )

    return {"token": token}
