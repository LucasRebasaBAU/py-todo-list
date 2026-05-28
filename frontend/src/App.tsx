import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { FilterBar, type FilterValue } from "@/components/FilterBar"
import { TodoList } from "@/components/TodoList"
import { TodoForm } from "@/components/TodoForm"
import { LoginPage } from "@/components/LoginPage"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos"
import { useAuth } from "@/hooks/useAuth"
import type { Todo } from "@/api/types"

function App() {
  const { isAuthenticated, login, register, logout, isLoading: authLoading, error: authError } = useAuth()
  const [filter, setFilter] = useState<FilterValue>("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const { data: todos = [], isLoading } = useTodos()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const handleToggle = (id: number, completed: boolean) => {
    updateTodo.mutate({ id, data: { completed } })
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setFormOpen(true)
  }

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id)
  }

  const handleFormSubmit = (data: { title: string; description: string }) => {
    if (editingTodo) {
      updateTodo.mutate({
        id: editingTodo.id,
        data: { title: data.title, description: data.description || null },
      })
    } else {
      createTodo.mutate({
        title: data.title,
        description: data.description || null,
      })
    }
  }

  const handleOpenChange = (open: boolean) => {
    setFormOpen(open)
    if (!open) setEditingTodo(null)
  }

  useEffect(() => {
    if (!formOpen) setEditingTodo(null)
  }, [formOpen])

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={login}
        onRegister={register}
        isLoading={authLoading}
        error={authError}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLogout={logout} />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <FilterBar value={filter} onChange={setFilter} />
          <Button onClick={() => setFormOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <TodoForm
          key={editingTodo?.id ?? "new"}
          open={formOpen}
          onOpenChange={handleOpenChange}
          onSubmit={handleFormSubmit}
          initialData={editingTodo}
        />
      </main>
    </div>
  )
}

export default App
