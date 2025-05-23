import axiosInstance from "../utils/axiosConfig.js";

export const getAllSubjects = async () => {
  try {
    const response = await axiosInstance.get("/subject/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo materias:", error);
    throw error;
  }
};

export const createSubject = async (subjectData) => {
  try {
    const response = await axiosInstance.post("/subject/create", subjectData);
    return response.data;
  } catch (error) {
    console.error("Error creando materia:", error);
    throw error;
  }
};

export const updateSubject = async (id, subjectData) => {
  try {
    const response = await axiosInstance.put(`/subject/${id}`, subjectData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando materia con ID ${id}:`, error);
    throw error;
  }
};

export const deleteSubject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/subject/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando materia con ID ${id}:`, error);
    throw error;
  }
};
