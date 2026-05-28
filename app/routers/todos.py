from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import Todo, User
from app.schemas import TodoCreate, TodoResponse, TodoUpdate

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=list[TodoResponse])
def list_todos(
    completed: bool | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    query = db.query(Todo)
    if completed is not None:
        query = query.filter(Todo.completed == completed)
    return query.all()


@router.get("/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@router.post("/", response_model=TodoResponse, status_code=201)
def create_todo(todo_data: TodoCreate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    todo = Todo(**todo_data.model_dump())
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


@router.put("/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo_data: TodoUpdate, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")

    update_fields = todo_data.model_dump(exclude_unset=True)
    for field, value in update_fields.items():
        setattr(todo, field, value)

    todo.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(todo)
    return todo


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
