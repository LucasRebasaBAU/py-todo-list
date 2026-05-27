import { CheckSquare } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center gap-2 px-4 py-6">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
      </div>
    </header>
  )
}
