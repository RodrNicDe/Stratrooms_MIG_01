import axiosInstance from "../utils/axiosConfig.js";

export const getAllTeachers = async () => {
  try {
    const response = await axiosInstance.get("/user/teacher/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

export const createTeacher = async (teacherData) => {
  try {
    const response = await axiosInstance.post(
      "/user/teacher/create",
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await axiosInstance.put(
      `/user/teacher/${id}`,
      teacherData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating teacher with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/teacher/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting teacher with ID ${id}:`, error);
    throw error;
  }
};
