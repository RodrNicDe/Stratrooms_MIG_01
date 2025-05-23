import db from "../config/database.js";
const { Materia } = db;

const subjectsService = {
  // Método para crear una nueva materia
  async createSubject(data) {
    try {
      const newSubject = await Materia.create({
        nombreMateria: data.nombreMateria,
        descripcionMateria: data.descripcionMateria,
      });
      return newSubject;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener todas las materias
  async getAllSubjects() {
    try {
      const subjects = await Materia.findAll();
      return subjects;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para obtener una materia por ID
  async getSubjectById(id) {
    try {
      const subject = await Materia.findByPk(id);
      if (!subject) {
        throw new Error("Materia no encontrada");
      }
      return subject;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para actualizar una materia
  async updateSubject(id, data) {
    try {
      const subject = await Materia.findByPk(id);
      if (!subject) {
        throw new Error("Materia no encontrada");
      }
      await subject.update(data);
      return subject;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Método para eliminar una materia
  async deleteSubject(id) {
    try {
      const subject = await Materia.findByPk(id);
      if (!subject) {
        throw new Error("Materia no encontrada");
      }
      await subject.destroy();
      return { message: "Materia eliminada con éxito" };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default subjectsService;
