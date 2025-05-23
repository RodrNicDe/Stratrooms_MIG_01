import subjectsService from "../services/subjectsService.js";

const subjectsController = {
  // Método para crear una nueva materia
  async createSubject(req, res) {
    try {
      const newSubject = await subjectsService.createSubject(req.body);
      res.status(201).json({ message: "Materia creada con éxito", newSubject });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener todas las materias
  async getAllSubjects(req, res) {
    try {
      const subjects = await subjectsService.getAllSubjects();
      res.status(200).json(subjects);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para obtener una materia por ID
  async getSubjectById(req, res) {
    try {
      const subject = await subjectsService.getSubjectById(req.params.id);
      res.status(200).json(subject);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para actualizar una materia
  async updateSubject(req, res) {
    try {
      const updatedSubject = await subjectsService.updateSubject(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({ message: "Materia actualizada con éxito", updatedSubject });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  // Método para eliminar una materia
  async deleteSubject(req, res) {
    try {
      await subjectsService.deleteSubject(req.params.id);
      res.status(200).json({ message: "Materia eliminada con éxito" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default subjectsController;
