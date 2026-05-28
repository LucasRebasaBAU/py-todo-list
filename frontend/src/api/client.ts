import axios from "axios"
import type { Todo, TodoCreate, TodoUpdate, AuthCredentials, TokenResponse } from "./types"

const api = axios.create({
  baseURL: "http://localhost:8000",
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) {
    config.headers.Authorization = "Bearer " + token
  }
  return config
})

export async function login(credentials: AuthCredentials): Promise<TokenResponse> {
  const params = new URLSearchParams()
  params.append("username", credentials.username)
  params.append("password", credentials.password)
  const { data } = await api.post<TokenResponse>("/auth/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
  return data
}

export async function register(credentials: AuthCredentials): Promise<void> {
  await api.post("/auth/register", {
    username: credentials.username,
    password: credentials.password,
  })
}

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
