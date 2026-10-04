from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import SessionLocal, test_database_connection
from models.user import User
from schemas import UserCreate
import os
from datetime import datetime, timedelta, timezone

from jose import jwt
from fastapi import HTTPException, status
from schemas import UserLogin, Token


app = FastAPI(
    title="FullStack GenAI SaaS API",
    description="Backend API for our FullStack GenAI SaaS Product",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "FullStack GenAI SaaS API is running 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/health/db")
def database_health():
    result = test_database_connection()

    return {
        "database": "connected",
        "test_result": result
    }


@app.post("/users")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    password_hash = pwd_context.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=password_hash,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
        },
    }
@app.post("/auth/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # Find the user by email
    user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    # Check whether the user exists and the password is correct
    if not user or not pwd_context.verify(
        user_data.password, user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create the JWT token
    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JWT secret is not configured",
        )

    expire_minutes = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expire_minutes
    )

    token_data = {
        "sub": str(user.id),
        "exp": expire,
    }

    access_token = jwt.encode(
        token_data,
        secret_key,
        algorithm="HS256",
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }
@app.post("/auth/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    # Find the user by email
    user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    # Check whether the user exists and the password is correct
    if not user or not pwd_context.verify(
        user_data.password, user.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create the JWT token
    secret_key = os.getenv("SECRET_KEY")
    if not secret_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="JWT secret is not configured",
        )

    expire_minutes = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expire_minutes
    )

    token_data = {
        "sub": str(user.id),
        "exp": expire,
    }

    access_token = jwt.encode(
        token_data,
        secret_key,
        algorithm="HS256",
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }