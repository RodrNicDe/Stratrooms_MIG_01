import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherService.js";
import { getAllBranches } from "../../services/sedeService.js";
import { teacherColumns } from "../../config/tableColumns.jsx";
import { transformUserFormData } from "../../utils/userUtils.js";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon.jsx";

function TeachersDetail() {
  const { user } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  // Validación de los campos del formulario
  const teacherValidationSchema = yup.object().shape({
    nombreUsuario: yup.string().required("Teacher name is required."),
    apllPatUsuario: yup.string().required("Last name is required."),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format.")
      .required("Email is required."),
    idSede: yup.string().required("Branch is required."),
    imgUrlUsuario: yup.string().url("Invalid image URL").nullable(),
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

  // Fetch de los profesores y sedes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [teachersResponse, branchesResponse] = await Promise.all([
          getAllTeachers(),
          getAllBranches(),
        ]);

        const branchMap = branchesResponse.reduce((map, branch) => {
          map[branch.idSede] = branch.nombreSede;
          return map;
        }, {});

        const transformedTeachers = teachersResponse.map((teacher) => ({
          ...teacher,
          branchName: branchMap[teacher.idSede],
        }));

        setTeachers(transformedTeachers);

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

  // Manejador de creación de profesor
  const handleCreate = async (formData) => {
    const dataToSend = {
      ...formData,
      idSede: parseInt(formData.idSede || selectedBranch),
    };

    const response = await createTeacher(dataToSend);
    const newTeacher = response.newUser;
    const branchName =
      branches.find((b) => b.value === parseInt(dataToSend.idSede))?.label ||
      "Unknown";

    setTeachers((prevTeachers) => [
      ...prevTeachers,
      {
        ...newTeacher,
        branchName,
      },
    ]);
  };

  // Manejador de actualización de profesor
  const handleUpdate = async (teacher, formData) => {
    const dataToSend = {
      ...formData,
      idSede: parseInt(formData.idSede || selectedBranch),
    };

    const response = await updateTeacher(teacher.idUsuario, dataToSend);
    const updatedTeacher = response.updatedUser;
    const branchName =
      branches.find((b) => b.value === parseInt(dataToSend.idSede))?.label ||
      "Unknown";

    setTeachers((prevTeachers) =>
      prevTeachers.map((t) =>
        t.idUsuario === updatedTeacher.idUsuario
          ? { ...t, ...updatedTeacher, branchName }
          : t
      )
    );
  };

  // Manejador de eliminación de profesor
  const handleDelete = async (teacher) => {
    await deleteTeacher(teacher.idUsuario);
    setTeachers((prevTeachers) =>
      prevTeachers.filter((t) => t.idUsuario !== teacher.idUsuario)
    );
  };

  // Manejadores para actualizar el estado de edición
  const handleAdd = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  // Campos del formulario
  const formFields = [
    {
      label: "Name",
      key: "nombreUsuario",
      type: "text",
      placeholder: "Teacher name",
      required: true,
      icon: (
        <Icon
          name="admin"
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
      placeholder: "Teacher email",
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
        : "Teacher password",
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
      title="Teachers"
      data={teachers}
      columns={teacherColumns}
      formFields={formFields}
      validationSchema={teacherValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      transformFormData={transformUserFormData}
      username={user.nombreUsuario}
      entityName="Teacher"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default TeachersDetail;
