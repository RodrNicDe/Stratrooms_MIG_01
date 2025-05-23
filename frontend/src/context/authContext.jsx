import { createContext, useState, useEffect, useCallback } from "react";
import {
  login as loginService,
  logout as logoutService,
  refreshToken as refreshTokenService,
  verifyToken as verifyTokenService,
} from "../services/authService.js";

export const AuthContext = createContext();

// Intervalo de verificación del token (1 minuto)
const TOKEN_CHECK_INTERVAL = 60 * 1000;

// Tiempo antes de la expiración para renovar el token (2 minutos)
const REFRESH_THRESHOLD = 2 * 60 * 1000;

// Duración del token de acceso (15 minutos)
const TOKEN_DURATION = 15 * 60 * 1000;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpirationTime, setTokenExpirationTime] = useState(null);

  // Función para iniciar sesión
  const login = useCallback(async (userData) => {
    try {
      const response = await loginService(userData.email, userData.password);
      const userInfo = { ...response };
      setUser(userInfo);
      // Establecer tiempo de expiración (15 minutos desde ahora)
      setTokenExpirationTime(Date.now() + TOKEN_DURATION);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  }, []);

  // Función para cerrar sesión
  const logout = useCallback(async () => {
    try {
      await logoutService();
      setUser(null);
      setTokenExpirationTime(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  }, []);

  // Función para refrescar el token
  const refreshSession = useCallback(async () => {
    try {
      await refreshTokenService();
      const response = await verifyTokenService();
      const { decoded } = response;
      if (!user || user.id !== decoded.id) {
        setUser(decoded);
      }
      // Actualizar tiempo de expiración
      setTokenExpirationTime(Date.now() + TOKEN_DURATION);
    } catch (error) {
      console.error("Error al renovar el token:", error);
      logout();
    }
  }, [user, logout]);

  // Efecto para verificar la sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await verifyTokenService();
        const { decoded } = response;
        if (!user || user.id !== decoded.id) {
          setUser(decoded);
        }
        setTokenExpirationTime(Date.now() + TOKEN_DURATION);
      } catch (err) {
        console.warn("Token inválido o expirado, intentando renovarlo...");
        try {
          await refreshSession();
        } catch (refreshError) {
          console.error("Error al renovar el token:", refreshError);
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [refreshSession, logout, user]);

  // Efecto para verificar y refrescar el token periódicamente
  useEffect(() => {
    if (!user) return;

    const checkTokenExpiration = async () => {
      const now = Date.now();
      const timeUntilExpiration = tokenExpirationTime - now;

      // Si faltan menos de 2 minutos para que expire, renovamos
      if (timeUntilExpiration < REFRESH_THRESHOLD) {
        await refreshSession();
      }
    };

    // Verificar el token cada minuto
    const tokenCheckInterval = setInterval(
      checkTokenExpiration,
      TOKEN_CHECK_INTERVAL
    );

    // Limpiar el intervalo al desmontar
    return () => clearInterval(tokenCheckInterval);
  }, [user, tokenExpirationTime, refreshSession]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
