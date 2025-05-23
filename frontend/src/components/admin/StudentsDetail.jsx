import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/studentService.js";
import { getAllBranches } from "../../services/sedeService.js";
import { studentColumns } from "../../config/tableColumns.jsx";
import { transformUserFormData } from "../../utils/userUtils.js";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon.jsx";

function StudentsDetail() {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const studentValidationSchema = yup.object().shape({
    nombreUsuario: yup.string().required("Student name is required."),
    apllPatUsuario: yup.string().required("Last name is required."),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format.")
      .required("Email is required."),
    idSede: yup.string().required("Branch is required."),
    imgUrlUsuario: yup.string().url("Must be a valid URL").nullable(),
    password: yup.string().when("$isEditing", {
      is: true,
      then: (schema) =>
        schema.test(
          "password-length",
          "Password must be at least 6 characters",
          (value) => {
            if (!value || value.trim() === "") return true;
            return value.length >= 6;
          }
        ),
      otherwise: (schema) =>
        schema
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
    }),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [studentsResponse, branchesResponse] = await Promise.all([
          getAllStudents(),
          getAllBranches(),
        ]);

        const branchMap = branchesResponse.reduce((map, branch) => {
          map[branch.idSede] = branch.nombreSede;
          return map;
        }, {});

        const transformedStudents = studentsResponse.map((student) => ({
          ...student,
          branchName: branchMap[student.idSede],
        }));

        setStudents(transformedStudents);

        // Configurar las opciones de branches
        const branchOptions = branchesResponse.map((branch) => ({
          value: branch.idSede,
          label: branch.nombreSede,
        }));
        setBranches(branchOptions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    const dataToSend = {
      ...formData,
      idSede: parseInt(formData.idSede || selectedBranch),
    };

    const response = await createStudent(dataToSend);
    const newStudent = response.newUser;
    const branchName =
      branches.find((b) => b.value === parseInt(dataToSend.idSede))?.label ||
      "Unknown";

    setStudents((prevStudents) => [
      ...prevStudents,
      {
        ...newStudent,
        branchName,
      },
    ]);
  };

  const handleUpdate = async (student, formData) => {
    const dataToSend = {
      ...formData,
      idSede: parseInt(formData.idSede || selectedBranch),
    };

    const response = await updateStudent(student.idUsuario, dataToSend);
    const updatedStudent = response.updatedUser;
    const branchName =
      branches.find((b) => b.value === parseInt(dataToSend.idSede))?.label ||
      "Unknown";

    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.idUsuario === updatedStudent.idUsuario
          ? { ...s, ...updatedStudent, branchName }
          : s
      )
    );
  };

  const handleDelete = async (student) => {
    await deleteStudent(student.idUsuario);
    setStudents((prevStudents) =>
      prevStudents.filter((s) => s.idUsuario !== student.idUsuario)
    );
  };

  const handleAdd = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const formFields = [
    {
      label: "Name",
      key: "nombreUsuario",
      type: "text",
      placeholder: "Student name",
      required: true,
      icon: (
        <Icon
          name="student"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Last Name",
      key: "apllPatUsuario",
      type: "text",
      placeholder: "Last name",
      required: true,
      icon: (
        <Icon
          name="description"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Email",
      key: "email",
      type: "email",
      placeholder: "Student email",
      required: true,
      icon: (
        <Icon
          name="email"
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Branch",
      key: "idSede",
      type: "select",
      placeholder: "Select branch",
      options: branches,
      required: true,
      icon: (
        <Icon
          name="branch"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: editing ? "Update Password" : "Password",
      key: "password",
      type: "password",
      placeholder: editing
        ? "Leave empty to keep current password"
        : "Student password",
      required: !editing,
      icon: (
        <Icon
          name="lock"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Profile Image",
      key: "imgUrlUsuario",
      type: "url",
      placeholder: "https://example.com/image.jpg",
      required: false,
      icon: (
        <Icon
          name="image"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  return (
    <CrudContainer
      title="Students"
      data={students}
      columns={studentColumns}
      formFields={formFields}
      validationSchema={studentValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      transformFormData={transformUserFormData}
      username={user.nombreUsuario}
      entityName="Student"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default StudentsDetail;
