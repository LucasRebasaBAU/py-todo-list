import { CheckSquare, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isDark: boolean
  onToggleDark: () => void
}

export function Header({ isDark, onToggleDark }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center gap-2 px-4 py-6">
        <CheckSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" onClick={onToggleDark} aria-label="Toggle dark mode">
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
