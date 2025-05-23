import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
import { TableContent } from "./tableContent";
import ReusableForm from "../forms/ReusableForm";
import TableSkeleton from "../loading/TableSkeleton";
import ErrorContent from "../error/errorContent";

const CrudContainer = ({
  title,
  data,
  columns,
  formFields,
  validationSchema,
  onAdd,
  onAddClick,
  onUpdate,
  onEditClick,
  onDelete,
  onRowClick,
  loading,
  error,
  transformFormData,
  username,
  entityName,
}) => {
  const { showNotification } = useNotification();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Manejador de creación de nuevo elemento
  const handleAdd = () => {
    setEditingItem(null);
    setFormValues({});
    setFormErrors({});
    setIsFormVisible(true);
    onAddClick();
  };

  // Manejador de edición de elemento existente
  const handleEdit = (itemData) => {
    setEditingItem(itemData);
    const transformedData = transformFormData
      ? transformFormData(itemData)
      : itemData;
    setFormValues(transformedData);
    setFormErrors({});
    setIsFormVisible(true);
    onEditClick(itemData);
  };

  // Manejador de cambio de valor en el formulario
  const handleInputChange = (name, value) => {
    let processedValue = value;

    setFormValues((prev) => ({ ...prev, [name]: processedValue }));
    // Validar el campo inmediatamente
    validateField(name, processedValue);
  };

  // Validación de campo individual
  const validateField = async (name, value) => {
    try {
      await validationSchema.validateAt(
        name,
        { [name]: value },
        {
          context: {
            isEditing: !!editingItem,
          },
        }
      );
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      setFormErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleInputBlur = (event) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  // Manejador de envío del formulario
  const handleFormSubmit = async () => {
    try {
      // Validar todos los campos antes de enviar
      await validationSchema.validate(formValues, {
        abortEarly: false,
        context: {
          isEditing: !!editingItem,
        },
      });

      if (editingItem) {
        await onUpdate(editingItem, formValues);
        showNotification("success", `${entityName} updated successfully.`);
      } else {
        await onAdd(formValues);
        showNotification("success", `${entityName} created successfully.`);
      }
      handleFormClose();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        error.inner?.forEach((err) => {
          errors[err.path] = err.message;
        });
        setFormErrors(errors);
      } else {
        console.error("Error during form submission:", error);
        showNotification(
          "error",
          `Failed to save ${entityName.toLowerCase()}. Please try again.`
        );
      }
    }
  };

  // Manejador de cierre del formulario
  const handleFormClose = () => {
    setIsFormVisible(false);
    setFormErrors({});
  };

  // Manejador de eliminación de elemento
  const handleDeleteClick = async (item) => {
    try {
      await onDelete(item);
      showNotification("success", `${entityName} deleted successfully.`);
    } catch (err) {
      showNotification(
        "error",
        `Failed to delete ${entityName.toLowerCase()}. Please try again.`
      );
    }
  };

  if (error) {
    return (
      <ErrorContent
        message={error.message || `Failed to load ${title.toLowerCase()}.`}
      />
    );
  }

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableContent
          title={title}
          data={data}
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onRowClick={onRowClick}
        />
      )}
      <ReusableForm
        title={editingItem ? `Edit ${entityName}` : `Add New ${entityName}`}
        fields={formFields}
        initialValues={formValues}
        onSubmit={handleFormSubmit}
        errors={formErrors}
        onClose={handleFormClose}
        onDelete={handleDeleteClick}
        isVisible={isFormVisible}
        editing={editingItem}
        onInputChange={handleInputChange}
        onBlur={handleInputBlur}
        username={username}
      />
    </>
  );
};

export default CrudContainer;
