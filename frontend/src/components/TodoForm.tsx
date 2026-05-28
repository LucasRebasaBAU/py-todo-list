import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronUp, Minus, ChevronDown } from "lucide-react"
import type { Todo, Priority } from "@/api/types"
import { cn } from "@/lib/utils"

interface TodoFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { title: string; description: string; priority: Priority }) => void
  initialData?: Todo | null
}

const priorityOptions: { value: Priority; label: string; icon: React.ReactNode; className: string; activeClassName: string }[] = [
  {
    value: "ALTA",
    label: "Alta",
    icon: <ChevronUp className="h-4 w-4" />,
    className: "border-red-200 text-red-600 hover:bg-red-50",
    activeClassName: "bg-red-100 border-red-400 text-red-700",
  },
  {
    value: "MEDIA",
    label: "Media",
    icon: <Minus className="h-4 w-4" />,
    className: "border-yellow-200 text-yellow-600 hover:bg-yellow-50",
    activeClassName: "bg-yellow-100 border-yellow-400 text-yellow-700",
  },
  {
    value: "BAJA",
    label: "Baja",
    icon: <ChevronDown className="h-4 w-4" />,
    className: "border-green-200 text-green-600 hover:bg-green-50",
    activeClassName: "bg-green-100 border-green-400 text-green-700",
  },
]

export function TodoForm({ open, onOpenChange, onSubmit, initialData }: TodoFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [description, setDescription] = useState(initialData?.description ?? "")
  const [priority, setPriority] = useState<Priority>(initialData?.priority ?? "MEDIA")

  const isEditing = !!initialData

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim(), priority })
    setTitle("")
    setDescription("")
    setPriority("MEDIA")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Task" : "New Task"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <div>
            <label className="text-sm font-medium mb-2 block">Priority</label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                    priority === option.value ? option.activeClassName : option.className
                  )}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!title.trim()}>
            {isEditing ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
