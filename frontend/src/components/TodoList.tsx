import { TodoCard } from "@/components/TodoCard"
import { ClipboardList } from "lucide-react"
import type { Todo } from "@/api/types"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

export function TodoList({ todos, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <ClipboardList className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm">Create a new task to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
