import userTeacherService from "../services/userTeacherService.js";

const userTeacherController = {
  // Método para crear un nuevo usuario profesor
  async createTeacherUser(req, res) {
    try {
      const newUser = await userTeacherService.createTeacherUser(req.body);
      res
        .status(201)
        .json({ message: "Usuario profesor creado con éxito", newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener todos los usuarios profesores
  async getAllTeacherUsers(req, res) {
    try {
      const users = await userTeacherService.getAllTeacherUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener un usuario profesor por ID
  async getTeacherUserById(req, res) {
    try {
      const user = await userTeacherService.getTeacherUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para actualizar un usuario profesor
  async updateTeacherUser(req, res) {
    try {
      const updatedUser = await userTeacherService.updateTeacherUser(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({
          message: "Usuario profesor actualizado con éxito",
          updatedUser,
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para eliminar un usuario profesor
  async deleteTeacherUser(req, res) {
    try {
      await userTeacherService.deleteTeacherUser(req.params.id);
      res.status(200).json({ message: "Usuario profesor eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default userTeacherController;
