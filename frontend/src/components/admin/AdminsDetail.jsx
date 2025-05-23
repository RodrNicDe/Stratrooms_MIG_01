import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
  getAllAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../../services/adminService.js";
import { adminColumns } from "../../config/tableColumns.jsx";
import { transformUserFormData } from "../../utils/userUtils.js";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon.jsx";

function AdminsDetail() {
  const { user } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  // Validación de los campos del formulario
  const adminValidationSchema = yup.object().shape({
    nombreUsuario: yup.string().required("Admin name is required."),
    apllPatUsuario: yup.string().required("Last name is required."),
    email: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format.")
      .required("Email is required."),
    imgUrlUsuario: yup.string().url("Must be a valid URL").nullable(),
    password: yup.string().when("$isEditing", {
      is: true,
      then: (schema) =>
        schema.test(
          "password-length",
          "Password must be at least 6 characters",
          (value) => {
            // Si no hay valor o está vacío en modo edición, es válido
            if (!value || value.trim() === "") return true;
            // Si hay valor, debe tener al menos 6 caracteres
            return value.length >= 6;
          }
        ),
      otherwise: (schema) =>
        schema
          .required("Password is required")
          .min(6, "Password must be at least 6 characters"),
    }),
  });

  // Fetch de los administradores
  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllAdminUsers();
        setAdmins(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  // Manejador de creación de administrador
  const handleCreate = async (formData) => {
    const response = await createAdminUser(formData);
    setAdmins((prevAdmins) => [...prevAdmins, response.newUser]);
  };

  // Manejador de actualización de administrador
  const handleUpdate = async (admin, formData) => {
    const response = await updateAdminUser(admin.idUsuario, formData);
    setAdmins((prevAdmins) =>
      prevAdmins.map((a) =>
        a.idUsuario === response.updatedUser.idUsuario
          ? { ...a, ...response.updatedUser }
          : a
      )
    );
  };

  // Manejador de eliminación de administrador
  const handleDelete = async (admin) => {
    await deleteAdminUser(admin.idUsuario);
    setAdmins((prevAdmins) =>
      prevAdmins.filter((a) => a.idUsuario !== admin.idUsuario)
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
      placeholder: "Admin name",
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
      placeholder: "Admin email",
      required: true,
      icon: (
        <Icon
          name="email"
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: editing ? "Update Password" : "Password",
      key: "password",
      type: "password",
      placeholder: editing
        ? "Leave empty to keep current password"
        : "Admin password",
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
      title="Admins"
      data={admins}
      columns={adminColumns}
      formFields={formFields}
      validationSchema={adminValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      transformFormData={transformUserFormData}
      username={user.nombreUsuario}
      entityName="Admin"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default AdminsDetail;
