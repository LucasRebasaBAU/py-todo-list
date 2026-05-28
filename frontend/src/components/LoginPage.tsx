import { useState } from "react"
import { CheckSquare, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginPageProps {
  onLogin: (credentials: { username: string; password: string }) => void
  onRegister: (credentials: { username: string; password: string }) => void
  isLoading: boolean
  error: string | null
}

export function LoginPage({ onLogin, onRegister, isLoading, error }: LoginPageProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [username, setUsername] = useState("Lucas")
  const [password, setPassword] = useState("lucas123")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password) return
    const credentials = { username: username.trim(), password }
    if (mode === "login") {
      onLogin(credentials)
    } else {
      onRegister(credentials)
    }
  }

  const switchMode = (next: "login" | "register") => {
    setMode(next)
    if (next === "register") {
      setUsername("")
      setPassword("")
    } else {
      setUsername("Lucas")
      setPassword("lucas123")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <CheckSquare className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login" ? "Sign in to manage your tasks" : "Create an account to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "login" ? "Signing in…" : "Creating account…"}
              </>
            ) : mode === "login" ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="text-primary underline-offset-4 hover:underline font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-primary underline-offset-4 hover:underline font-medium"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
