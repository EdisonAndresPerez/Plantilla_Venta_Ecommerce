import { Navigate, useLocation } from "react-router-dom";

export const SmartRedirect = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Si la ruta empieza con /auth o /admin (sin barra correcta), redirigir apropiadamente
  if (pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  if (pathname.startsWith("/auth")) {
    return <Navigate to="/auth/login" replace />;
  }

  // Para cualquier otra ruta, ir al home
  return <Navigate to="/" replace />;
};
