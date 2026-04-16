import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // Importe o useSelector
import type { RootState } from "../store"; // Importe o tipo da sua store

export const ProtectedRoute = () => {
  // AJUSTE AQUI: Em vez de "false", buscamos o valor real do Redux
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  const location = useLocation();

  if (!isAuthenticated) {
    toast.warning("Você precisa fazer login para acessar esta página.", {
      toastId: "auth-warning",
    });

    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};