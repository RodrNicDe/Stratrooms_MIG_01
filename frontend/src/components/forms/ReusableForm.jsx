import { useEffect, useRef, useState } from "react";
import ModalTransition from "../transitions/ModalTransition";
import StyledSelect from "./CustomSelect";
import Icon from "../home/Icon";
import ConfirmationAlert from "../alerts/ConfirmationAlert";

const ReusableForm = ({
  title,
  fields,
  initialValues,
  onSubmit,
  onClose,
  onDelete,
  isVisible,
  editing,
  errors,
  onInputChange,
  onBlur,
  username,
  entityName = "item",
}) => {
  const formRef = useRef(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    let timeoutId;

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        // Solo cerramos si no hay diálogo de confirmación abierto
        if (!showDeleteConfirmation) {
          onClose();
        }
      }
    }

    if (isVisible) {
      timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose, showDeleteConfirmation]);

  // Manejador de clic en el botón de eliminación
  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  // Manejador de confirmación de eliminación
  const handleConfirmDelete = () => {
    if (editing && onDelete) {
      onDelete(editing);
    }
    setShowDeleteConfirmation(false);
    onClose();
  };

  // Manejador de cancelación de eliminación
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  // Renderización de campos del formulario
  const renderField = (field) => {
    const commonClasses = `bg-gray-50 border ${
      errors[field.key]
        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
    } text-sm rounded-lg block w-full ${
      field.icon ? "pl-10" : ""
    } p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

    // Renderización de campo de selección
    if (field.type === "select") {
      return (
        <StyledSelect
          id={field.key}
          name={field.key}
          options={field.options}
          value={initialValues[field.key] || ""}
          onChange={(value) => onInputChange(field.key, value)}
          placeholder={field.placeholder}
          required={field.required}
          disabled={field.disabled}
          icon={field.icon}
          error={errors[field.key]}
        />
      );
    }

    // Renderización de campo de texto
    if (field.type === "textarea") {
      return (
        <textarea
          id={field.key}
          name={field.key}
          className={commonClasses}
          placeholder={field.placeholder}
          value={initialValues[field.key] || ""}
          onChange={(e) => onInputChange(field.key, e.target.value)}
          onBlur={onBlur}
          rows={4}
          required={field.required}
          disabled={field.disabled}
        />
      );
    }

    // Renderización de input
    return (
      <input
        type={field.type}
        id={field.key}
        name={field.key}
        className={commonClasses}
        placeholder={field.placeholder}
        value={initialValues[field.key] || ""}
        onChange={(e) => onInputChange(field.key, e.target.value)}
        onBlur={onBlur}
        aria-invalid={errors[field.key] ? "true" : "false"}
        required={field.required}
        disabled={field.disabled}
      />
    );
  };

  return (
    <>
      <ModalTransition isVisible={isVisible}>
        <div
          ref={formRef}
          className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full max-w-xl"
        >
          <div className="mt-3 sm:mx-0 sm:mt-0 text-left">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
              >
                {fields.map((field) => (
                  <div key={field.key} className="mb-6">
                    <label
                      htmlFor={field.key}
                      className={`block mb-2 text-sm font-medium ${
                        errors[field.key]
                          ? "text-red-700 dark:text-red-500"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-1 text-black dark:text-white font-bold">
                          *
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      {field.icon && (
                        <div
                          className={`absolute start-0 ps-3 pointer-events-none ${
                            field.type === "textarea"
                              ? "top-2.5"
                              : "inset-y-0 flex items-center"
                          }`}
                        >
                          {field.icon}
                        </div>
                      )}
                      {renderField(field)}
                    </div>
                    {errors[field.key] && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">¡Error!</span>{" "}
                        {errors[field.key]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="flex justify-between gap-2">
                  {editing && onDelete && (
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="text-red-600 inline-flex items-center font-bold rounded-4xl text-xs hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={handleDeleteClick}
                      >
                        <Icon name="trash" className="w-6 h-6 mr-1" />
                        Delete
                      </button>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 items-center">
                    <button
                      type="button"
                      className="py-3 px-5 font-bold text-sm text-gray-900 focus:outline-none bg-white rounded-4xl border border-gray-200 hover:bg-gray-100 hover:text-gray-600 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-4xl py-3 px-7 font-bold text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ModalTransition>

      {/* Separamos el ConfirmationAlert del ModalTransition principal */}
      <ConfirmationAlert
        isOpen={showDeleteConfirmation}
        onCancel={handleCancelDelete}
        onDelete={handleConfirmDelete}
        username={username}
        type={entityName}
        message={
          editing?.nombreUsuario ||
          editing?.nombreSede ||
          editing?.nombreMateria ||
          "this item"
        }
      />
    </>
  );
};

export default ReusableForm;
