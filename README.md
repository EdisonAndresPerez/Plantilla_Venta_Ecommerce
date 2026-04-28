# Bunker|Shop - Frontend E-commerce

Frontend oficial de la plataforma de e-commerce **Bunker|Shop**. Desarrollado con un enfoque estricto en rendimiento, escalabilidad y experiencia de usuario (UX/UI). Este proyecto integra un catálogo público completo, sistema persistente de carrito, autenticación de usuarios y un panel administrativo avanzado.

## 🚀 Características Principales

*   **Catálogo Dinámico:** Búsqueda en tiempo real y filtros combinados por categoría (gender), talla (sizes) y precio. Diseño responsive con opciones de vista intercambiable (Grid/List).
*   **Gestión de Carrito y Favoritos:** Manejo de estado persistente del lado del cliente para una experiencia de compra fluida.
*   **Autenticación Segura:** Sistema de Login/Registro para usuarios y validación de roles basada en Token JWT con rutas protegidas.
*   **Panel Administrativo (Backoffice):**
    *   Dashboard analítico en tiempo real que reporta métricas exactas: Stock Total, Valor del Inventario Monetizado y Porcentaje de Productos Activos.
    *   Módulo completo de gestión de inventario (CRUD de productos) y visualización en formato tabla con renderizado de datos consumidos de la API.
*   **Optimización y Caché:** Fetching de datos optimizado minimizando las cargas de red y mejorando la respuesta de la interfaz.

## 🛠️ Stack Tecnológico

*   **Core:** React 19, TypeScript 5.9, Vite 7 (con SWC).
*   **Enrutamiento:** React Router v7.
*   **Gestión del Estado:**
    *   *Server State:* TanStack React Query v5.
    *   *Client State:* Zustand v5.
*   **Estilos y UI:** Tailwind CSS v4, Radix UI, Framer Motion e Iconos de Lucide React.
*   **Comunicaciones HTTP:** Axios.

## 🏗️ Arquitectura del Código

El proyecto sigue una arquitectura modular dividida por dominios lógicos de negocio:

- src/admin/: Backoffice: Dashboard, Inventario y Formulario de productos.
- src/api/: Instancias HTTP globales y configuración de Axios.
- src/auth/: Dominio de autenticación: Login, Registro, Store y Hooks.
- src/components/: Componentes UI transversales, alertas y botones base (Design System).
- src/hooks/: Custom hooks compartidos.
- src/interfaces/: Declaraciones estrictas de tipado en TypeScript.
- src/lib/: Utilidades y formateadores.
- src/shop_front/: Catálogo público: Páginas estáticas (About), Home, Grid de productos y Carrito.

## 📦 Instalación y Ejecución

```bash
# 1. Clonar e instalar
git clone <url-del-repositorio>
cd ecomerce-plantilla
npm install

# 2. Configurar Entorno
# Crear archivo .env en la raíz con el endpoint a la API
VITE_API_URL=http://localhost:3000/api

# 3. Iniciar desarrollo
npm run dev

# Compilar producción
npm run build
```

## 🔒 Control de Acceso Estricto

Las vistas están segregadas en Layouts protegidos dependiendo el estado del usuario:

*   **Rutas Públicas:** /, /gender/:gender, /product/:idSlug, /about, /cart.
*   **Rutas de Autenticación (Solo No Logueados):** /auth/login, /auth/register.
*   **Rutas Privadas (Admin):** /admin — Su acceso está protegido por un middleware de Router y la validación de rol del store de Zustand (isAdmin()).

## 📄 Licencia

Este frontend se encuentra bajo desarrollo privado. Revisa la documentación interna para directrices de nuevos endpoints.
