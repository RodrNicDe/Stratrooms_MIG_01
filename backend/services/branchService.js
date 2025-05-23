import db from "../config/database.js";
const { Sede } = db;

const branchService = {
  // Método para crear una nueva sede
  async createBranch(data) {
    try {
      const newBranch = await Sede.create({
        nombreSede: data.nombreSede,
        direccionSede: data.direccionSede,
        telefonoSede: data.telefonoSede,
        emailSede: data.emailSede,
      });
      return newBranch;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Método para obtener todas las sedes
  async getAllBranches() {
    try {
      const branches = await Sede.findAll();
      return branches;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Método para obtener una sede por ID
  async getBranchById(id) {
    try {
      const branch = await Sede.findByPk(id);
      if (!branch) {
        throw new Error("Sede no encontrada");
      }
      return branch;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Método para actualizar una sede
  async updateBranch(id, data) {
    try {
      const branch = await Sede.findByPk(id);
      if (!branch) {
        throw new Error("Sede no encontrada");
      }
      await branch.update(data);
      return branch;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Método para eliminar una sede
  async deleteBranch(id) {
    try {
      const branch = await Sede.findByPk(id);
      if (!branch) {
        throw new Error("Sede no encontrada");
      }
      await branch.destroy();
      return { message: "Sede eliminada con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default branchService;
