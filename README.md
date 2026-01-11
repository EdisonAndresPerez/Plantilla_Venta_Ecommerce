
# Plantilla Venta Ecommerce (React + Vite + TypeScript)

Plantilla base para un ecommerce con **Shop (cliente)**, **Auth (login/registro)** y **Admin (panel)**.


## Stack

- React 19
- Vite 7
- TypeScript
- ESLint
- React Router 7

## Estructura del proyecto

```
src/
	admin/        # Panel administrativo (layouts + pages)
	auth/         # Login/registro (layouts + pages)
	shop_front/   # Tienda (layouts + pages)
	app.router.tsx
	TesloShopApp.tsx
	main.tsx
```

## Rutas (plan)

Estas rutas son la intención de la arquitectura (se irán implementando en `src/app.router.tsx`):

- Shop
	- `/` Home
	- `/gender/:gender` listado por género
	- `/product/:slug` detalle de producto
- Auth
	- `/auth/login`
	- `/auth/register`
- Admin
	- `/admin` dashboard
	- `/admin/products` listado
	- `/admin/product/:id` edición/creación

## Requisitos

- Node.js LTS (recomendado 20+)
- npm

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Vite mostrará una URL tipo `http://localhost:5173/`.

## Scripts

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción (TypeScript + Vite)
- `npm run preview`: previsualizar build
- `npm run lint`: ejecutar ESLint

## Variables de entorno (cuando apliquen)

Cuando integremos backend/pasarela de pagos, usaremos `.env` (no se versiona). Ejemplo futuro:

```
VITE_API_URL=https://api.example.com
```

## Convención de commits y frecuencia

Este proyecto usa **Conventional Commits** para que el historial sea legible y escalable.

- Guía completa: ver [CONTRIBUTING.md](CONTRIBUTING.md)

Reglas rápidas:
- Commits pequeños y atómicos (un cambio lógico por commit).
- Commitea cada vez que completes un paso verificable (no “cada X horas”).
- Ejemplos:
	- `feat(shop): add product card component`
	- `fix(auth): handle invalid credentials error`
	- `docs(readme): add setup steps`

## Roadmap (sugerido)

- Router real + layouts con navegación
- Estado global (auth, cart)
- Catálogo (fetch + paginación)
- Carrito + checkout
- Admin: CRUD productos
- Integración API + manejo de errores

## Licencia

Pendiente / por definir.

