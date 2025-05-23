import db from "../config/database.js";
import bcrypt from "bcrypt";
const { Usuario } = db;

const userStudentService = {
  // Método para crear un nuevo usuario estudiante
  async createStudentUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await Usuario.create({
        tipoUsuario: "ALUMNO",
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
  // Método para obtener todos los usuarios estudiantes
  async getAllStudentUsers() {
    try {
      const users = await Usuario.findAll({
        where: { tipoUsuario: "ALUMNO" },
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener un usuario estudiante por ID
  async getStudentUserById(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ALUMNO",
        },
      });
      if (!user) {
        throw new Error("Usuario estudiante no encontrado");
      }
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para actualizar un usuario estudiante
  async updateStudentUser(id, data) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ALUMNO",
        },
      });
      if (!user) {
        throw new Error("Usuario estudiante no encontrado");
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
  // Método para eliminar un usuario estudiante
  async deleteStudentUser(id) {
    try {
      const user = await Usuario.findOne({
        where: {
          idUsuario: id,
          tipoUsuario: "ALUMNO",
        },
      });
      if (!user) {
        throw new Error("Usuario estudiante no encontrado");
      }
      await user.destroy();
      return { message: "Estudiante eliminado con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default userStudentService;
