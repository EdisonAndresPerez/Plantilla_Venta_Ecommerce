import { lazy } from "react";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { ShopLayout } from "./shop_front/layouts/ShopLayout";
import { HomePage } from "./shop_front/pages/home/HomePage";
import { ProductPage } from "./shop_front/pages/product/ProductPage";
import { GenderPage } from "./shop_front/pages/gender/GenderPage";
import LoginPage from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";


import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";



const  AuthLayoutLazy = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayoutLazy = lazy(() => import('./admin/layouts/AdminLayout'));



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
    ],
  },

  //Rutas Autenticacion
  {
    path: "/auth",
    element: <AuthLayoutLazy />,
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
    ],
  },

  //rutas administrativas
  {
    path: "/admin",
    element: <AdminLayoutLazy />,
    children: [
      {
        path: "products",
        element: <AdminProductPage />,
      },
      {
        path: "products/:id",
        element: <AdminProductsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
