import axiosInstance from "../utils/axiosConfig.js";

export const getAllAdminUsers = async () => {
  try {
    const response = await axiosInstance.get("/user/admin/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

export const createAdminUser = async (adminData) => {
  try {
    const response = await axiosInstance.post("/user/admin/create", adminData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

export const updateAdminUser = async (id, adminData) => {
  try {
    const response = await axiosInstance.put(`/user/admin/${id}`, adminData);
    return response.data;
  } catch (error) {
    console.error(`Error updating admin with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAdminUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/admin/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting admin with ID ${id}:`, error);
    throw error;
  }
};
