from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.auth import hash_password
from app.database import Base, SessionLocal, engine
from app.models import User
from app.routers import auth, todos

DEFAULT_USERNAME = "Lucas"
DEFAULT_PASSWORD = "lucas123"


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.username == DEFAULT_USERNAME).first():
            db.add(User(username=DEFAULT_USERNAME, hashed_password=hash_password(DEFAULT_PASSWORD)))
            db.commit()
    finally:
        db.close()
    yield


app = FastAPI(
    title="TODO List API",
    docs_url=None,
    redoc_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(todos.router)
