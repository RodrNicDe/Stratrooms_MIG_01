import React, { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

const AlumnoDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Bienvenido, {user.nombreUsuario}
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Tipo de usuario:{" "}
          <span className="font-semibold">{user.tipoUsuario}</span>
        </p>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default AlumnoDashboard;
