import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { FilterBar, type FilterValue, type PriorityFilterValue } from "@/components/FilterBar"
import { TodoList } from "@/components/TodoList"
import { TodoForm } from "@/components/TodoForm"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos"
import type { Todo, Priority } from "@/api/types"

function App() {
  const [filter, setFilter] = useState<FilterValue>("all")
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilterValue>("all")
  const [formOpen, setFormOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const { data: todos = [], isLoading } = useTodos()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()

  const filteredTodos = todos.filter((todo) => {
    if (filter === "pending" && todo.completed) return false
    if (filter === "completed" && !todo.completed) return false
    if (priorityFilter !== "all" && todo.priority !== priorityFilter) return false
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

  const handleFormSubmit = (data: { title: string; description: string; priority: Priority }) => {
    if (editingTodo) {
      updateTodo.mutate({
        id: editingTodo.id,
        data: { title: data.title, description: data.description || null, priority: data.priority },
      })
    } else {
      createTodo.mutate({
        title: data.title,
        description: data.description || null,
        priority: data.priority,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <FilterBar
            value={filter}
            onChange={setFilter}
            priorityValue={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
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
