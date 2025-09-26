from fastapi import APIRouter
from app.models import Item

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello from Backend!"}

@router.post("/items/")
def create_item(item: Item):
    return {"received_item": item}