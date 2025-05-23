import db from "../config/database.js";
import bcrypt from "bcrypt";
const { Usuario } = db;

const userTeacherService = {
  // Método para crear un nuevo usuario profesor
  async createTeacherUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await Usuario.create({
        tipoUsuario: "PROFESOR",
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
  // Método para obtener todos los usuarios profesores
  async getAllTeacherUsers() {
    try {
      const users = await Usuario.findAll({
        where: { tipoUsuario: "PROFESOR" },
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener un usuario profesor por ID
  async getTeacherUserById(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "PROFESOR",
        },
      });
      if (!user) {
        throw new Error("Usuario profesor no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para actualizar un usuario profesor
  async updateTeacherUser(id, data) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "PROFESOR",
        },
      });
      if (!user) {
        throw new Error("Usuario profesor no encontrado");
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
  // Método para eliminar un usuario profesor
  async deleteTeacherUser(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "PROFESOR",
        },
      });
      if (!user) {
        throw new Error("Usuario profesor no encontrado");
      }
      await user.destroy();
      return { message: "Profesor eliminado con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default userTeacherService;
