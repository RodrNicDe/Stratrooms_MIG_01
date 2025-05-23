import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../services/courseService";
import { getAllSubjects } from "../../services/subjectsService";
import { getAllTeachers } from "../../services/teacherService";
import { getAllBranches } from "../../services/sedeService";
import { courseColumns } from "../../config/tableColumns";
import CrudContainer from "./CrudContainer";
import Icon from "../home/Icon";
import * as yup from "yup";

function GroupsContent() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  const courseValidationSchema = yup.object().shape({
    nombreCurso: yup.string().required("Course name is required"),
    descripcionCurso: yup.string(),
    idMateria: yup.number().required("Subject is required"),
    idProfesor: yup.number().required("Teacher is required"),
    idSede: yup.number().required("Branch is required"),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [coursesData, subjectsData, teachersData, branchesData] =
          await Promise.all([
            getAllCourses(),
            getAllSubjects(),
            getAllTeachers(),
            getAllBranches(),
          ]);

        const subjectMap = subjectsData.reduce((map, subject) => {
          map[subject.idMateria] = subject.nombreMateria;
          return map;
        }, {});

        const teacherMap = teachersData.reduce((map, teacher) => {
          map[
            teacher.idUsuario
          ] = `${teacher.nombreUsuario} ${teacher.apllPatUsuario}`;
          return map;
        }, {});

        const branchMap = branchesData.reduce((map, branch) => {
          map[branch.idSede] = branch.nombreSede;
          return map;
        }, {});

        // Transformar los cursos con los nombres correspondientes
        const transformedCourses = coursesData.map((course) => ({
          ...course,
          nombreMateria: subjectMap[course.idMateria],
          nombreProfesor: teacherMap[course.idProfesor],
          nombreSede: branchMap[course.idSede],
          profesor: teachersData.find((t) => t.idUsuario === course.idProfesor),
        }));

        setCourses(transformedCourses);

        // Configurar las opciones de subjects
        const subjectOptions = subjectsData.map((subject) => ({
          value: subject.idMateria,
          label: subject.nombreMateria,
        }));
        setSubjects(subjectOptions);

        // Configurar las opciones de teachers
        const teacherOptions = teachersData.map((teacher) => ({
          value: teacher.idUsuario,
          label: `${teacher.nombreUsuario} ${teacher.apllPatUsuario}`,
        }));
        setTeachers(teacherOptions);
        // Configurar las opciones de branches
        const branchOptions = branchesData.map((branch) => ({
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
      idMateria: parseInt(formData.idMateria),
      idProfesor: parseInt(formData.idProfesor),
      idSede: parseInt(formData.idSede),
    };

    const response = await createCourse(dataToSend);

    // Buscar los datos en los catálogos locales
    const subject = subjects.find((s) => s.value === response.idMateria);
    const teacher = teachers.find((t) => t.value === response.idProfesor);
    const branch = branches.find((b) => b.value === response.idSede);

    // Objeto completo del profesor para el avatar
    const allTeachers = await getAllTeachers();
    const profesor = allTeachers.find(
      (t) => t.idUsuario === response.idProfesor
    );

    const transformedCourse = {
      ...response,
      nombreMateria: subject?.label || "Unknown",
      nombreProfesor: teacher?.label || "Unknown",
      nombreSede: branch?.label || "Unknown",
      profesor: profesor,
    };

    setCourses((prevCourses) => [...prevCourses, transformedCourse]);
  };

  const handleUpdate = async (course, formData) => {
    const dataToSend = {
      ...formData,
      idMateria: parseInt(formData.idMateria),
      idProfesor: parseInt(formData.idProfesor),
      idSede: parseInt(formData.idSede),
    };

    const response = await updateCourse(course.idCurso, dataToSend);

    // Buscar los datos en los catálogos locales
    const subject = subjects.find((s) => s.value === response.idMateria);
    const teacher = teachers.find((t) => t.value === response.idProfesor);
    const branch = branches.find((b) => b.value === response.idSede);

    // Objeto completo del profesor para el avatar
    const allTeachers = await getAllTeachers();
    const profesor = allTeachers.find(
      (t) => t.idUsuario === response.idProfesor
    );

    const transformedCourse = {
      ...response,
      nombreMateria: subject?.label || "Unknown",
      nombreProfesor: teacher?.label || "Unknown",
      nombreSede: branch?.label || "Unknown",
      profesor: profesor,
    };

    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.idCurso === transformedCourse.idCurso ? transformedCourse : c
      )
    );
  };

  const handleDelete = async (course) => {
    await deleteCourse(course.idCurso);
    setCourses((prevCourses) =>
      prevCourses.filter((c) => c.idCurso !== course.idCurso)
    );
  };

  const handleAdd = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleRowClick = (course) => {
    navigate(`/groups/${course.idCurso}`);
  };

  const formFields = [
    {
      label: "Course Name",
      key: "nombreCurso",
      type: "text",
      placeholder: "Enter course name",
      required: true,
      icon: (
        <Icon
          name="course"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Description",
      key: "descripcionCurso",
      type: "textarea",
      placeholder: "Course description",
      icon: (
        <Icon
          name="description"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Subject",
      key: "idMateria",
      type: "select",
      placeholder: "Select subject",
      options: subjects,
      required: true,
      icon: (
        <Icon
          name="subject"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        />
      ),
    },
    {
      label: "Teacher",
      key: "idProfesor",
      type: "select",
      placeholder: "Select teacher",
      options: teachers,
      required: true,
      icon: (
        <Icon
          name="teacher"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
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
  ];

  return (
    <CrudContainer
      title="Courses"
      data={courses}
      columns={courseColumns}
      formFields={formFields}
      validationSchema={courseValidationSchema}
      onAdd={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      onRowClick={handleRowClick}
      loading={loading}
      error={error}
      username={user.nombreUsuario}
      entityName="Course"
      onAddClick={handleAdd}
      onEditClick={handleEdit}
    />
  );
}

export default GroupsContent;
