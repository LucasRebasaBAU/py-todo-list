import { CheckSquare, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onLogout?: () => void
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-6">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Todo List</h1>
        </div>
        {onLogout && (
          <Button variant="ghost" size="sm" onClick={onLogout} className="gap-1.5 text-muted-foreground">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        )}
      </div>
    </header>
  )
}
