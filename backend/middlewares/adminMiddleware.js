import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ error: "Acceso no autorizado: Token no proporcionado" });
    }

    // Verificar el token de acceso
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded; // Almacena la información del usuario decodificada en el objeto req

    // Verificar el rol del usuario
    if (req.user.tipoUsuario !== "ADMINISTRADOR") {
      return res
        .status(403)
        .json({ error: "Acceso prohibido: Se requiere rol de Administrador" });
    }

    next(); // Llama a next() para pasar el control al siguiente middleware o ruta
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res
      .status(401)
      .json({ error: "Acceso no autorizado: Token inválido" }); // Devuelve 401 para token inválido
  }
};

export { verifyToken };
