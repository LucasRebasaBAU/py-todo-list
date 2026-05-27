from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import todos


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="TODO List API",
    docs_url=None,
    redoc_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todos.router)


@app.get("/", include_in_schema=False, response_class=HTMLResponse)
def home():
    return """
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>TODO List API</title>
      <style>
        :root {
          color-scheme: light dark;
          --bg: #f5f5f5;
          --text: #111111;
          --card: #ffffff;
          --button: #111111;
          --button-text: #ffffff;
        }
        body.dark {
          --bg: #111827;
          --text: #f9fafb;
          --card: #1f2937;
          --button: #f9fafb;
          --button-text: #111827;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          display: grid;
          place-items: center;
        }
        .toggle {
          position: fixed;
          top: 16px;
          right: 16px;
          border: none;
          border-radius: 999px;
          padding: 10px 14px;
          background: var(--button);
          color: var(--button-text);
          cursor: pointer;
          font-weight: 600;
        }
        .card {
          background: var(--card);
          border-radius: 12px;
          padding: 24px;
          max-width: 560px;
          margin: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      </style>
    </head>
    <body>
      <button id="themeToggle" class="toggle" type="button">🌙 Modo oscuro</button>
      <main class="card">
        <h1>TODO List API</h1>
        <p>API REST para gestionar tareas. Usa los endpoints bajo <strong>/todos</strong>.</p>
      </main>
      <script>
        const storageKey = "theme";
        const button = document.getElementById("themeToggle");

        function applyTheme(theme) {
          document.body.classList.toggle("dark", theme === "dark");
          button.textContent = theme === "dark" ? "☀️ Modo claro" : "🌙 Modo oscuro";
        }

        const savedTheme = localStorage.getItem(storageKey) || "light";
        applyTheme(savedTheme);

        button.addEventListener("click", () => {
          const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
          localStorage.setItem(storageKey, nextTheme);
          applyTheme(nextTheme);
        });
      </script>
    </body>
    </html>
    """
