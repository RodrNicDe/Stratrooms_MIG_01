import db from "../config/database.js";
import bcrypt from "bcrypt";
const { Usuario } = db;

const userAdminService = {
  // Método para crear un nuevo usuario administrador
  async createAdminUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await Usuario.create({
        tipoUsuario: "ADMINISTRADOR",
        nombreUsuario: data.nombreUsuario,
        apllPatUsuario: data.apllPatUsuario,
        apllMatUsuario: data.apllMatUsuario,
        idSede: data.idSede,
        email: data.email,
        password: hashedPassword,
        imgUrlUsuario: data.imgUrlUsuario,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener todos los usuarios administradores
  async getAllAdminUsers() {
    try {
      const users = await Usuario.findAll({
        where: { tipoUsuario: "ADMINISTRADOR" },
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener un usuario administrador por ID
  async getAdminUserById(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ADMINISTRADOR",
        },
      });
      if (!user) {
        throw new Error("Usuario administrador no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para actualizar un usuario administrador
  async updateAdminUser(id, data) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ADMINISTRADOR",
        },
      });
      if (!user) {
        throw new Error("Usuario administrador no encontrado");
      }
      // Si se proporciona una nueva contraseña, la hasheamos
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      await user.update(data);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para eliminar un usuario administrador
  async deleteAdminUser(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ADMINISTRADOR",
        },
      });
      if (!user) {
        throw new Error("Usuario administrador no encontrado");
      }
      await user.destroy();
      return { message: "Administrador eliminado con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default userAdminService;
