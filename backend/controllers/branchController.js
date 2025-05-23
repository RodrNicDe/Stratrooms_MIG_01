import branchService from "../services/branchService.js";

const branchController = {
  // Método para crear una nueva sede
  async createBranch(req, res) {
    try {
      const newBranch = await branchService.createBranch(req.body);
      res.status(201).json({ message: "Sede creada con éxito", newBranch });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener todas las sedes
  async getAllBranches(req, res) {
    try {
      const branches = await branchService.getAllBranches();
      res.status(200).json(branches);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener una sede por ID
  async getBranchById(req, res) {
    try {
      const branch = await branchService.getBranchById(req.params.id);
      res.status(200).json(branch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para actualizar una sede
  async updateBranch(req, res) {
    try {
      const updatedBranch = await branchService.updateBranch(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Sede actualizada con éxito", updatedBranch });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para eliminar una sede
  async deleteBranch(req, res) {
    try {
      await branchService.deleteBranch(req.params.id);
      res.status(200).json({ message: "Sede eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default branchController;
