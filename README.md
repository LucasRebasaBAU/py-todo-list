# TODO List API

Backend REST API para gestión de tareas (TODO list) construido con FastAPI y SQLAlchemy.

Los datos se almacenan en una base de datos SQLite en memoria, por lo que se reinician al detener el servidor.

## Requisitos

- Python 3.12+

## Instalación

```bash
pip install -r requirements.txt
```

## Ejecución

```bash
python -m uvicorn app.main:app --reload
```

El servidor se levanta en `http://localhost:8000`.

## Autenticación

La API utiliza **JWT (JSON Web Tokens)** para proteger los endpoints. El flujo es el siguiente:

1. El servidor crea automáticamente el usuario por defecto **`Lucas`** (contraseña: `lucas123`) al arrancar.
2. El cliente obtiene un token llamando a `POST /auth/login` con sus credenciales.
3. El token se incluye en cada petición como encabezado `Authorization: Bearer <your_token>`.
4. Los tokens expiran a los **30 minutos**. El cliente debe volver a iniciar sesión para obtener uno nuevo.

Las contraseñas se almacenan con hash **bcrypt** y nunca en texto plano.

La clave secreta JWT puede configurarse mediante la variable de entorno `JWT_SECRET_KEY` (cambiarla en producción).

## Endpoints

### Autenticación

| Método | Ruta             | Descripción                          | Auth requerida |
|--------|------------------|--------------------------------------|----------------|
| `POST` | `/auth/register` | Registrar un nuevo usuario           | No             |
| `POST` | `/auth/login`    | Iniciar sesión y obtener token JWT   | No             |

### Todos (requieren token JWT)

| Método   | Ruta            | Descripción                                      |
|----------|-----------------|--------------------------------------------------|
| `POST`   | `/todos/`       | Crear un nuevo todo                              |
| `GET`    | `/todos/`       | Listar todos (filtro opcional `?completed=true`) |
| `GET`    | `/todos/{id}`   | Obtener un todo por ID                           |
| `PUT`    | `/todos/{id}`   | Actualizar un todo                               |
| `DELETE` | `/todos/{id}`   | Eliminar un todo                                 |

## Ejemplos

Iniciar sesión (usuario por defecto):

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=Lucas&password=lucas123"
```

Crear un todo (con token):

```bash
curl -X POST http://localhost:8000/todos/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title": "Comprar leche", "description": "En el supermercado"}'
```

Listar todos (con token):

```bash
curl http://localhost:8000/todos/ \
  -H "Authorization: Bearer <your_token>"
```

Actualizar un todo:

```bash
curl -X PUT http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"completed": true}'
```

Eliminar un todo:

```bash
curl -X DELETE http://localhost:8000/todos/1 \
  -H "Authorization: Bearer <your_token>"
```
