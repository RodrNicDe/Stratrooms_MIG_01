import userStudentService from "../services/userStudentService.js";

const userStudentController = {
  // Método para crear un nuevo usuario estudiante
  async createStudentUser(req, res) {
    try {
      const newUser = await userStudentService.createStudentUser(req.body);
      res
        .status(201)
        .json({ message: "Usuario estudiante creado con éxito", newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener todos los usuarios estudiantes
  async getAllStudentUsers(req, res) {
    try {
      const users = await userStudentService.getAllStudentUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener un usuario estudiante por ID
  async getStudentUserById(req, res) {
    try {
      const user = await userStudentService.getStudentUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para actualizar un usuario estudiante
  async updateStudentUser(req, res) {
    try {
      const updatedUser = await userStudentService.updateStudentUser(
        req.params.id,
        req.body
      );
      res.status(200).json({
        message: "Usuario estudiante actualizado con éxito",
        updatedUser,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para eliminar un usuario estudiante
  async deleteStudentUser(req, res) {
    try {
      await userStudentService.deleteStudentUser(req.params.id);
      res
        .status(200)
        .json({ message: "Usuario estudiante eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default userStudentController;
