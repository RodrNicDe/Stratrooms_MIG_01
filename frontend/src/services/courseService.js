import axiosInstance from "../utils/axiosConfig.js";

export const getAllCourses = async () => {
  try {
    const response = await axiosInstance.get("/course/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo cursos:", error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el curso con ID ${id}:`, error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await axiosInstance.post("/course/create", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creando curso:", error);
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await axiosInstance.put(`/course/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando curso con ID ${id}:`, error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await axiosInstance.delete(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando curso con ID ${id}:`, error);
    throw error;
  }
};

export const enrollInCourse = async (enrollmentData) => {
  try {
    const response = await axiosInstance.post("/course/enroll", enrollmentData);
    return response.data;
  } catch (error) {
    console.error("Error inscribiendo al curso:", error);
    throw error;
  }
};

export const unenrollFromCourse = async (enrollmentData) => {
  try {
    const response = await axiosInstance.post(
      "/course/unenroll",
      enrollmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelando inscripción al curso:", error);
    throw error;
  }
};

export const getMyCourses = async (userId) => {
  try {
    const response = await axiosInstance.get(`/course/mycourses/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo cursos del usuario ${userId}:`, error);
    throw error;
  }
};
