# 🛍️ Teslo Shop - E-commerce Platform

Plataforma de e-commerce moderna y responsive para gestión y venta de productos de moda urbana. Construida con React, TypeScript y TanStack Query.

## ✨ Características

- 🎨 **Interfaz Moderna**: Diseño responsive con Tailwind CSS y componentes reutilizables
- 🔍 **Filtros Avanzados**: Búsqueda por género, tallas y rangos de precio
- 📱 **Mobile First**: Diseño optimizado para dispositivos móviles
- 🚀 **Performance**: Optimizado con React Query para caching y gestión de estado del servidor
- 🔐 **Panel de Administración**: Gestión completa de productos (CRUD)
- 🎯 **Paginación**: Navegación eficiente entre productos
- 🖼️ **Galería de Imágenes**: Múltiples imágenes por producto

## 🛠️ Tecnologías

### Frontend
- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router 7** - Enrutamiento
- **TanStack Query** - Gestión de estado del servidor
- **Axios** - Cliente HTTP
- **Tailwind CSS 4** - Estilos
- **Radix UI** - Componentes accesibles
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js >= 18.x
- npm o yarn
- Backend API de Teslo Shop corriendo (por defecto en `http://localhost:3000`)

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd ecomerce-plantilla
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_API_URL=http://localhost:3000/api
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Construye el proyecto para producción
npm run preview   # Previsualiza el build de producción
npm run lint      # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
src/
├── admin/              # Módulo de administración
│   ├── components/     # Componentes del admin
│   ├── layouts/        # Layouts del admin
│   └── pages/          # Páginas del admin
├── shop_front/         # Módulo de tienda
│   ├── actions/        # Acciones API (productos)
│   ├── components/     # Componentes de la tienda
│   ├── hooks/          # Custom hooks (useProducts)
│   ├── layouts/        # Layouts de la tienda
│   └── pages/          # Páginas de la tienda
├── auth/               # Módulo de autenticación
│   ├── components/     # Componentes de auth
│   └── pages/          # Login y Register
├── api/                # Configuración de Axios
├── components/         # Componentes compartidos
│   ├── custom/         # Componentes personalizados
│   └── ui/             # Componentes UI base
├── interfaces/         # Tipos TypeScript
└── lib/                # Utilidades
```

## 🔌 Endpoints de API

El frontend se comunica con los siguientes endpoints:

### Productos
```typescript
GET    /products              # Obtener productos (con filtros)
GET    /products/:id          # Obtener producto por ID
POST   /products              # Crear producto (Admin)
PATCH  /products/:id          # Actualizar producto (Admin)
DELETE /products/:id          # Eliminar producto (Admin)

# Parámetros de consulta soportados:
# - limit: número de productos por página
# - offset: desplazamiento para paginación
# - gender: filtro por género (women, men, kid)
# - sizes: filtro por tallas (S,M,L,XL,etc)
# - minPrice: precio mínimo
# - maxPrice: precio máximo
```

### Archivos
```typescript
GET /files/product/:filename  # Obtener imagen de producto
```

## 🎨 Características por Módulo

### 🛒 Shop Front
- Página de inicio con productos destacados
- Filtrado por género (mujer, hombre, niños)
- Filtrado por tallas y precios
- Vista de detalle de producto
- Paginación de resultados
- Diseño responsive

### 👨‍💼 Panel de Administración
- Lista de productos con búsqueda
- Crear nuevos productos
- Editar productos existentes
- Eliminar productos
- Gestión de imágenes

### 🔐 Autenticación
- Login de usuarios
- Registro de usuarios
- Rutas protegidas

## 🎯 Roadmap

- [ ] Implementar carrito de compras
- [ ] Sistema de favoritos
- [ ] Integración de pasarela de pago
- [ ] Reviews y ratings de productos
- [ ] Sistema de órdenes
- [ ] Perfil de usuario
- [ ] Historial de compras

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan el código)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

## 📝 Licencia

Este proyecto es privado y no está bajo ninguna licencia de código abierto.

## 👨‍💻 Autor

Desarrollado para proyecto de e-commerce Teslo Shop

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!
