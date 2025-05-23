import courseService from "../services/courseService.js";

const courseController = {
  // Crear nuevo curso
  createCourse: async (req, res) => {
    try {
      const course = await courseService.createCourse(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Obtener todos los cursos
  getAllCourses: async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Obtener un curso por ID
  getCourseById: async (req, res) => {
    try {
      const course = await courseService.getCourseById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Actualizar un curso
  updateCourse: async (req, res) => {
    try {
      const course = await courseService.updateCourse(req.params.id, req.body);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Eliminar un curso
  deleteCourse: async (req, res) => {
    try {
      const course = await courseService.deleteCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Inscribirse en un curso
  enrollInCourse: async (req, res) => {
    try {
      const course = await courseService.enrollInCourse(req.body);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Cancelar inscripción en un curso
  unenrollFromCourse: async (req, res) => {
    try {
      const course = await courseService.unenrollFromCourse(req.body);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // Obtener cursos del usuario
  getMyCourses: async (req, res) => {
    try {
      const courses = await courseService.getMyCourses(req.params.id);
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default courseController;
