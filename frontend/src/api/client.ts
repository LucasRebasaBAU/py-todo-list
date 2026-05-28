import axios from "axios"
import type { Todo, TodoCreate, TodoUpdate } from "./types"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

export async function fetchTodos(completed?: boolean): Promise<Todo[]> {
  const params = completed !== undefined ? { completed } : {}
  const { data } = await api.get<Todo[]>("/todos/", { params })
  return data
}

export async function createTodo(todo: TodoCreate): Promise<Todo> {
  const { data } = await api.post<Todo>("/todos/", todo)
  return data
}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo> {
  const { data } = await api.put<Todo>(`/todos/${id}`, todo)
  return data
}

export async function deleteTodo(id: number): Promise<void> {
  await api.delete(`/todos/${id}`)
}
