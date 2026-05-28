export type Priority = "ALTA" | "MEDIA" | "BAJA"

export interface Todo {
  id: number
  title: string
  description: string | null
  completed: boolean
  priority: Priority
  created_at: string
  updated_at: string
}

export interface TodoCreate {
  title: string
  description?: string | null
  priority?: Priority
}

export interface TodoUpdate {
  title?: string
  description?: string | null
  completed?: boolean
  priority?: Priority
}
