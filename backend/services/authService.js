import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
const { Usuario } = db;

const authService = {
  async login(email, password) {
    const userInstance = await Usuario.findOne({ where: { email } });
    if (!userInstance) throw new Error("Credenciales incorrectas");

    const isPasswordValid = await bcrypt.compare(
      password,
      userInstance.password
    );
    if (!isPasswordValid) throw new Error("Credenciales incorrectas");

    const user = userInstance.toJSON();
    delete user.password; // Eliminar la contraseña del objeto de usuario

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken, user };
  },

  verifyToken(accessToken) {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  },

  verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  },
};

export default authService;
