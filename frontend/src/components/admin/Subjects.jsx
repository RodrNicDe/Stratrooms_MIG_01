import * as yup from "yup";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../../services/subjectsService.js";
import { subjectColumns } from "../../config/tableColumns.jsx";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon.jsx";

function SubjectsContent() {
  const { user } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const subjectValidationSchema = yup.object().shape({
    nombreMateria: yup.string().required("Subject name is required."),
    descripcionMateria: yup.string().nullable(),
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllSubjects();
        setSubjects(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleCreate = async (formData) => {
    const response = await createSubject(formData);
    setSubjects((prevSubjects) => [...prevSubjects, response.newSubject]);
  };

  const handleUpdate = async (subject, formData) => {
    const response = await updateSubject(subject.idMateria, formData);
    setSubjects((prevSubjects) =>
      prevSubjects.map((s) =>
        s.idMateria === response.updatedSubject.idMateria
          ? { ...s, ...response.updatedSubject }
          : s
      )
    );
  };

  const handleDelete = async (subject) => {
    await deleteSubject(subject.idMateria);
    setSubjects((prevSubjects) =>
      prevSubjects.filter((s) => s.idMateria !== subject.idMateria)
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
      key: "nombreMateria",
      type: "text",
      placeholder: "Subject name",
      required: true,
      icon: (
        <Icon
          name="subject"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Description",
      key: "descripcionMateria",
      type: "textarea",
      placeholder: "Subject description",
      icon: (
        <Icon
          name="description"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
  ];

  return (
    <CrudContainer
      title="Subjects"
      data={subjects}
      columns={subjectColumns}
      formFields={formFields}
      validationSchema={subjectValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
      error={error}
      username={user.nombreUsuario}
      entityName="Subject"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default SubjectsContent;
