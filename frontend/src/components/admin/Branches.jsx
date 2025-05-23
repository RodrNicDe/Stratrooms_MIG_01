import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
  getAllBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../../services/sedeService.js";
import { branchColumns } from "../../config/tableColumns.jsx";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon.jsx";

function BranchesContent() {
  const { user } = useContext(AuthContext);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const branchValidationSchema = yup.object().shape({
    nombreSede: yup.string().required("Branch name is required."),
    direccionSede: yup.string().required("Branch address is required."),
    telefonoSede: yup.string().matches(/^\+\d{2}\s\d{8,10}$/, {
      message: "Invalid phone format (e.g., +XX XXXXXXXXXX).",
      excludeEmptyString: true,
    }),
    emailSede: yup
      .string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format.")
      .required("Email is required."),
  });

  useEffect(() => {
    const fetchBranches = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllBranches();
        setBranches(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleCreate = async (formData) => {
    const response = await createBranch(formData);
    setBranches((prevBranches) => [...prevBranches, response.newBranch]);
  };

  const handleUpdate = async (branch, formData) => {
    const response = await updateBranch(branch.idSede, formData);
    setBranches((prevBranches) =>
      prevBranches.map((b) =>
        b.idSede === response.updatedBranch.idSede
          ? { ...b, ...response.updatedBranch }
          : b
      )
    );
  };

  const handleDelete = async (branch) => {
    await deleteBranch(branch.idSede);
    setBranches((prevBranches) =>
      prevBranches.filter((b) => b.idSede !== branch.idSede)
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
      key: "nombreSede",
      type: "text",
      placeholder: "Branch name",
      required: true,
      icon: (
        <Icon
          name="branch"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Address",
      key: "direccionSede",
      type: "text",
      placeholder: "Full address",
      required: true,
      icon: (
        <Icon
          name="address"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Phone",
      key: "telefonoSede",
      type: "tel",
      placeholder: "+52 123-456-7890",
      icon: (
        <Icon
          name="phone"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Email",
      key: "emailSede",
      type: "email",
      placeholder: "name@stratrooms.com",
      required: true,
      icon: (
        <Icon
          name="email"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  return (
    <CrudContainer
      title="Branches"
      data={branches}
      columns={branchColumns}
      formFields={formFields}
      validationSchema={branchValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      username={user.nombreUsuario}
      entityName="Branch"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default BranchesContent;
