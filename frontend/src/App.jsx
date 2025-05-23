import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.jsx";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AlumnoDashboard from "./pages/AlumnDashboard.jsx";
import PrivateRoute from "./routes/privateRoute.jsx";
import PublicRoute from "./routes/publicRoute.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <PrivateRoute allowedRoles={["ADMINISTRADOR"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/teacher"
        element={
          <PrivateRoute allowedRoles={["PROFESOR"]}>
            <TeacherDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/alumn"
        element={
          <PrivateRoute allowedRoles={["ALUMNO"]}>
            <AlumnoDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/*"
        element={
          <PrivateRoute allowedRoles={["ADMINISTRADOR", "PROFESOR", "ALUMNO"]}>
            {user?.tipoUsuario === "ADMINISTRADOR" && <AdminDashboard />}
            {user?.tipoUsuario === "PROFESOR" && <TeacherDashboard />}
            {user?.tipoUsuario === "ALUMNO" && <AlumnoDashboard />}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
