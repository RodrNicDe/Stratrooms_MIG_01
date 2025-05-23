import axiosInstance from "../utils/axiosConfig.js";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { user, ...rest } = response.data;
    return { ...user, ...rest };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      // Credenciales incorrectas
      if (status === 400 || status === 401) {
        throw new Error(data.message || "Incorrect email or password.");
      }
      // Otros errores del servidor
      console.error("Error en el servidor:", data);
      throw new Error(data.message || "Server error. Please try again later.");
    }
    // No hubo respuesta del servidor
    if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      throw new Error(
        "Unable to connect to the server. Please check your connection."
      );
    }
    // Otros errores de JS
    console.error("Error desconocido:", error.message);
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};

export const refreshToken = async () => {
  await axiosInstance.post("/auth/refreshToken");
};

export const verifyToken = async () => {
  const response = await axiosInstance.get("/auth/verify");
  return response.data;
};
