# Teslo Shop Frontend

Frontend de e-commerce para catálogo y administración de productos, construido con React 19, TypeScript, TanStack Query y Vite.

Este documento describe el estado real del proyecto: arquitectura, flujos implementados, endpoints usados, limitaciones actuales y recomendaciones para desarrollo/despliegue.

## 1. Resumen Ejecutivo

El proyecto está dividido en tres dominios:

- Shop Front: navegación pública, listado de productos, filtros por talla/precio/búsqueda, vistas por categoría.
- Auth: login/registro y control de sesión con Zustand + token JWT.
- Admin: listado de productos, edición/creación con subida de imágenes y control de acceso por rol `admin`.

Fortalezas actuales:

- Arquitectura modular y ordenada por dominio.
- Gestión de estado servidor robusta con TanStack Query.
- Flujo de autenticación funcional con renovación de token por check-status.
- Interfaz responsive con Tailwind 4 y componentes reutilizables.

Estado funcional actual (alto nivel):

- Implementado: login, registro, rutas protegidas, catálogo con filtros, paginación, listado admin, crear/editar producto, subida de imágenes.
- Parcial/pendiente: detalle de producto (`ProductPage` placeholder), acciones de eliminar en admin sin lógica, carrito simulado en UI.

## 2. Stack Técnico

- React 19
- TypeScript 5.9
- Vite 7 + SWC
- React Router 7 (`createHashRouter`)
- TanStack Query 5
- Zustand 5
- Axios
- Tailwind CSS 4
- Radix UI + utilidades CVA/clsx/tailwind-merge
- Sonner (toasts)
- Framer Motion

## 3. Requisitos

- Node.js 18+
- npm 9+
- Backend Teslo API disponible

## 4. Instalación y Ejecución

1. Clonar repositorio

```bash
git clone <url-del-repositorio>
cd ecomerce-plantilla
```

2. Instalar dependencias

```bash
npm install
```

3. Variables de entorno (`.env` en raíz)

```bash
VITE_API_URL=http://localhost:3000/api
```

4. Desarrollo

```bash
npm run dev
```

5. Build de producción

```bash
npm run build
```

6. Preview local del build

```bash
npm run preview
```

## 5. Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## 6. Arquitectura del Proyecto

```text
src/
	admin/         # Backoffice (dashboard, lista y formulario de productos)
	auth/          # Login/registro + store de autenticación
	shop_front/    # Catálogo público, filtros y páginas públicas
	api/           # Cliente Axios con interceptor de token
	components/    # UI transversal y utilitarios visuales
	hooks/         # Hooks compartidos (filtros, toast)
	interfaces/    # Tipos de dominio (Product, User, responses)
	lib/           # helpers (formatPrice, cn)
```

Puntos técnicos importantes:

- Alias `@/*` configurado en TypeScript y Vite.
- `verbatimModuleSyntax: true`: los tipos deben importarse con `import type`.
- Router basado en hash (`createHashRouter`), útil para hosting estático sin reescrituras de servidor.

## 7. Rutas y Acceso

Rutas públicas:

- `/`
- `/gender/:gender`
- `/product/:idSlug` (vista pendiente de implementar)
- `/about`

Rutas de autenticación:

- `/auth/login`
- `/auth/register`

Rutas admin:

- `/admin`
- `/admin/products`
- `/admin/products/:id` (`:id = new` para crear)

Protección de rutas:

- `NoAuthenticatedRoute`: evita que un usuario logueado entre a `/auth/*`.
- `AdminAuthenticatedRoute`: exige sesión activa y rol admin.

## 8. Gestión de Estado y Datos

### 8.1 Estado de sesión (Zustand)

Store en `auth.store.ts`:

- `user`, `token`, `authStatus`
- `login`, `register`, `logout`, `checkAuthStatus`
- Getter `isAdmin()` basado en roles.

### 8.2 Estado servidor (React Query)

- Query global de auth en `TesloShopApp.tsx`:
	- `queryKey: ["auth"]`
	- `queryFn: checkAuthStatus`
	- `refetchInterval: 1 min`

- Productos catálogo:
	- `queryKey: ["products", filtros]`
	- `placeholderData: keepPreviousData`

- Producto individual/admin:
	- `queryKey: ["product", { id }]`
	- `staleTime: 5 min`

- Mutación create/update:
	- invalida queries de productos
	- actualiza caché de lista para reflejo rápido en UI

## 9. Integración con API

Cliente HTTP:

- `src/api/tesloApi.ts`
- Inyecta `Authorization: Bearer <token>` desde `localStorage`.

Endpoints usados actualmente:

Auth:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/check-status`

Productos:

- `GET /products` con params:
	- `limit`, `offset`, `sizes`, `gender`, `minPrice`, `maxPrice`, `q`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`

Archivos:

- `POST /files/product` (upload)
- `GET /files/product/:filename` (resolución de URL de imagen)

Nota de dominio:

- El proyecto usa categorías en español en frontend: `camisetas`, `sudaderas`, `chaquetas`, `accesorios`.

## 10. Flujo de Productos (Shop + Admin)

Shop:

1. Header/URL generan filtros (`sizes`, `price`, `search`, `gender`).
2. `useProducts` construye query y consulta API.
3. Respuesta normaliza URLs de imágenes.
4. `ProductsGrid` muestra cards + paginación.

Admin:

1. Lista admin reutiliza `useProducts` con búsqueda server-side.
2. Formulario (`/admin/products/:id`) consume `useProduct`.
3. Al guardar:
	 - opcional upload de archivos
	 - merge de imágenes existentes + nuevas
	 - `PATCH`/`POST` con nombres de archivo
4. Se actualiza caché y se navega al producto guardado.

## 11. UI/UX Actual

- Diseño responsive y enfoque mobile-first en componentes principales.
- Tema visual consistente (shop + auth + admin).
- Toasts centralizados con Sonner (`src/components/ui/sonner.tsx`).

## 12. Limitaciones y Pendientes Reales

Funcionalidad:

- `ProductPage` está como placeholder (`ProductPage` retorna texto simple).
- Botón de eliminar en tabla admin no ejecuta mutación.
- Dashboard admin usa datos mock/estáticos.
- Carrito y favoritos son visuales (sin persistencia/transacciones).

Calidad técnica:

- Hay `console.log` y algunos comentarios de depuración en módulos clave.
- No hay suite de tests automatizados aún.
- No existe `src/components/ui/toast.tsx`; el proyecto usa Sonner (ya documentado).

## 13. Despliegue

Este frontend usa `createHashRouter`, por lo que puede desplegarse en hosting estático sin reglas especiales de rewrite para rutas SPA.

Checklist de despliegue:

1. Configurar `VITE_API_URL` apuntando al backend real.
2. Ejecutar `npm run build`.
3. Publicar carpeta `dist`.
4. Verificar CORS y cabeceras `Authorization` en backend.

## 14. Troubleshooting

### Error: "Cannot find module '@/components/ui/toast'"

Causa: falta el archivo `ui/toast.tsx`.

Resolución recomendada:

- Mantener `sonner` como sistema de toast (implementación actual), o
- crear el componente `ui/toast.tsx` si se quiere migrar al patrón de shadcn toast.

### Error de TypeScript con imports de tipos

Con `verbatimModuleSyntax: true`, usar:

```ts
import type { MiTipo } from "...";
```

en lugar de mezclar tipo y valor en el mismo import cuando el símbolo sea solo tipo.

## 15. Convenciones Recomendadas para el Equipo

- Mantener el patrón `actions/ + hooks/ + pages/` por dominio.
- Centralizar llamadas HTTP en `api/` y `actions/`.
- Usar React Query para estado servidor y evitar duplicar estado local.
- Evitar lógica de negocio en componentes visuales.
- Remover logs de depuración antes de producción.

## 16. Roadmap Sugerido

- Implementar detalle real de producto (`ProductPage`).
- Implementar delete producto con confirmación y actualización de caché.
- Añadir carrito real (estado + checkout).
- Añadir tests (unitarios y de integración para hooks/actions).
- Añadir monitoreo de errores y trazas en producción.

## 17. Licencia

Proyecto privado.
