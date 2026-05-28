import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "@/api/client"
import type { TodoCreate, TodoUpdate } from "@/api/types"

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (todo: TodoCreate) => createTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TodoUpdate }) =>
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    },
  })
}
