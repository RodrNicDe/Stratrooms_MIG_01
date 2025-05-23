import userAdminService from "../services/userAdminService.js";

const userAdminController = {
  // Método para crear un nuevo usuario administrador
  async createAdminUser(req, res) {
    try {
      const newUser = await userAdminService.createAdminUser(req.body);
      res
        .status(201)
        .json({ message: "Usuario administrador creado con éxito", newUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener todos los usuarios administradores
  async getAllAdminUsers(req, res) {
    try {
      const users = await userAdminService.getAllAdminUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener un usuario administrador por ID
  async getAdminUserById(req, res) {
    try {
      const user = await userAdminService.getAdminUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para actualizar un usuario administrador
  async updateAdminUser(req, res) {
    try {
      const updatedUser = await userAdminService.updateAdminUser(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({
          message: "Usuario administrador actualizado con éxito",
          updatedUser,
        });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para eliminar un usuario administrador
  async deleteAdminUser(req, res) {
    try {
      await userAdminService.deleteAdminUser(req.params.id);
      res
        .status(200)
        .json({ message: "Usuario administrador eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default userAdminController;
