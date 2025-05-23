import axiosInstance from "../utils/axiosConfig";

export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get("/user/student/all");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post(
      "/user/student/create",
      studentData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await axiosInstance.put(
      `/user/student/${id}`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/student/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
