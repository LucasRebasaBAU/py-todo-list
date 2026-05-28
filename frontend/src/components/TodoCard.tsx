import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Calendar, ChevronUp, Minus, ChevronDown } from "lucide-react"
import type { Todo, Priority } from "@/api/types"
import { cn } from "@/lib/utils"

interface TodoCardProps {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

const priorityConfig: Record<Priority, { label: string; icon: React.ReactNode; className: string }> = {
  ALTA: {
    label: "Alta",
    icon: <ChevronUp className="h-3.5 w-3.5" />,
    className: "text-red-600 bg-red-50 border-red-200",
  },
  MEDIA: {
    label: "Media",
    icon: <Minus className="h-3.5 w-3.5" />,
    className: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  BAJA: {
    label: "Baja",
    icon: <ChevronDown className="h-3.5 w-3.5" />,
    className: "text-green-600 bg-green-50 border-green-200",
  },
}

export function TodoCard({ todo, onToggle, onEdit, onDelete }: TodoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = () => {
    setIsDeleting(true)
    onDelete(todo.id)
  }

  const formattedDate = new Date(todo.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const priority = priorityConfig[todo.priority]

  return (
    <Card className={cn("transition-opacity", isDeleting && "opacity-50")}>
      <CardContent className="flex items-start gap-3 p-4">
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "font-medium leading-snug",
                todo.completed && "line-through text-muted-foreground"
              )}
            >
              {todo.title}
            </p>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                priority.className
              )}
            >
              {priority.icon}
              {priority.label}
            </span>
          </div>
          {todo.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {todo.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(todo)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
