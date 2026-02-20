import { useStoreAuth } from "@/auth/store/auth.store";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authStatus } = useStoreAuth();
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;
  return children;
};

export const NoAuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authStatus } = useStoreAuth();
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated")
    return <Navigate to="/" replace />;
    return children;
};


export const AdminAuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authStatus, isAdmin } = useStoreAuth();
  if (authStatus === "checking") return null;
  if (authStatus === "not-authenticated")
    return <Navigate to="/auth/login" replace />;
  if (!isAdmin()) return <Navigate to="/" replace />;

  return children;
};

