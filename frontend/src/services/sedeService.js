import axiosInstance from "../utils/axiosConfig.js";

export const getAllBranches = async () => {
  try {
    const response = await axiosInstance.get("/branch/all");
    return response.data;
  } catch (error) {
    console.error("Error obteniendo sedes:", error);
    throw error;
  }
};

export const createBranch = async (branchData) => {
  try {
    const response = await axiosInstance.post("/branch/create", branchData);
    return response.data;
  } catch (error) {
    console.error("Error creando sede:", error);
    throw error;
  }
};

export const updateBranch = async (id, branchData) => {
  try {
    const response = await axiosInstance.put(`/branch/${id}`, branchData);
    return response.data;
  } catch (error) {
    console.error(`Error actualizando sede con ID ${id}:`, error);
    throw error;
  }
};

export const deleteBranch = async (id) => {
  try {
    const response = await axiosInstance.delete(`/branch/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error eliminando sede con ID ${id}:`, error);
    throw error;
  }
};
