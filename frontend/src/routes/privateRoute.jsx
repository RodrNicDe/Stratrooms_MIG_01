import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="w-screen h-screen bg-white dark:bg-gray-800"></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirigir al login si no está autenticado
  }

  if (!allowedRoles.includes(user.tipoUsuario)) {
    return <Navigate to="/" replace />; // Redirigir si no tiene permiso
  }

  return children; // Renderizar la página si tiene permiso
};

export default PrivateRoute;
