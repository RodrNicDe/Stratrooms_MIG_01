import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="w-screen h-screen bg-white dark:bg-gray-800"></div>;
  }

  // Si ya hay usuario, redirige a la página principal
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Si NO hay usuario, renderiza el componente hijo (Login)
  return children;
};

export default PublicRoute;
