import { lazy } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ShopLayout } from "./shop_front/layouts/ShopLayout";
import { HomePage } from "./shop_front/pages/home/HomePage";
import { ProductPage } from "./shop_front/pages/product/ProductPage";
import { GenderPage } from "./shop_front/pages/gender/GenderPage";
import LoginPage from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";

import { AdminProductFormPage } from "./admin/pages/product/AdminProductFormPage";
import { AdminProductsListPage } from "./admin/pages/products/AdminProductsListPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { SmartRedirect } from "./components/SmartRedirect";
import { AboutPage } from "./shop_front/pages/about/AboutPage";
import { AdminAuthenticatedRoute,  NoAuthenticatedRoute } from "./components/routes/ProtectedRoutes";



const AuthLayoutLazy = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayoutLazy = lazy(() => import("./admin/layouts/AdminLayout"));




export const AppRouter = createBrowserRouter([
  //rutas publicas
  {
    path: "/",
    element: <ShopLayout />,
    //rutas hijas
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "product/:idSlug",
        element: <ProductPage />,
      },
      {
        path: "gender/:gender",
        element: <GenderPage />,
      },
      {
        path: "about",
        element: <AboutPage/>,
      }
    ],
  },

  //Rutas Autenticacion
  {
    path: "/auth",
    element: 
    <NoAuthenticatedRoute>
      <AuthLayoutLazy />,
    </NoAuthenticatedRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },
  //rutas administrativas
  {
    path: "/admin",
    element:
    <AdminAuthenticatedRoute>
      <AdminLayoutLazy />,
    </AdminAuthenticatedRoute> ,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsListPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductFormPage />,
      },
      {
        path: "*",
        element: <Navigate to="/admin" replace />,
      },
    ],
  },

  //Ruta para manejar rutas no encontradas - redirige inteligentemente según el prefijo
  {
    path: "*",
    element: <SmartRedirect />,
  },
]);
