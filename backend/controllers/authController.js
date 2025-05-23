import authService from "../services/authService.js";
import jwt from "jsonwebtoken";

const authController = {
  // Método para iniciar sesión
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login(
        email,
        password
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutos
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  // Metodo para refrescar el accessToken
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({ error: "Refresh token es requerido" });
      }

      const decoded = authService.verifyRefreshToken(refreshToken);
      delete decoded.iat;
      delete decoded.exp; // Eliminar propiedades innecesarias del payload

      const accessToken = jwt.sign(
        decoded,
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Generar un nuevo access token
      );

      // Guardar el nuevo accessToken en una cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutos
      });

      res.status(200).json({ message: "Access token renovado" });
    } catch (error) {
      res.status(403).json({ error: "Refresh token inválido o expirado" });
    }
  },

  // Método para verificar el token
  async verify(req, res) {
    try {
      const accessToken = req.cookies.accessToken;
      if (!accessToken) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      const decoded = authService.verifyToken(accessToken);
      res.status(200).json({ decoded });
    } catch (error) {
      res.status(401).json({ error: "Token inválido o expirado" });
    }
  },

  // Método para cerrar sesión
  async logout(req, res) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Sesión cerrada con éxito" });
    } catch (error) {
      res.status(500).json({ error: "Error al cerrar sesión" });
    }
  },
};

export default authController;
