export interface Todo {
  id: number
  title: string
  description: string | null
  completed: boolean
  created_at: string
  updated_at: string
}

export interface TodoCreate {
  title: string
  description?: string | null
}

export interface TodoUpdate {
  title?: string
  description?: string | null
  completed?: boolean
}

export interface AuthCredentials {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}
