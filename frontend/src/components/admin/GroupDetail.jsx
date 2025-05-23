import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  enrollInCourse,
  unenrollFromCourse,
} from "../../services/courseService";
import { getAllStudents } from "../../services/studentService";
import { UserPlus, UserMinus } from "lucide-react";
import TableSkeleton from "../loading/TableSkeleton";
import ErrorContent from "../error/errorContent";

function GroupDetail() {
  const { groupId } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(groupId);
        const [courseData, studentsData] = await Promise.all([
          getCourseById(groupId),
          getAllStudents(),
        ]);
        setCourse(courseData);
        setStudents(studentsData);
        updateAvailableStudents(courseData, studentsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupId]);

  const updateAvailableStudents = (courseData, allStudents) => {
    const enrolledIds = new Set(
      courseData.Inscripcions.map((insc) => insc.idAlumno)
    );
    setAvailableStudents(
      allStudents.filter((student) => !enrolledIds.has(student.idUsuario))
    );
  };

  const handleEnroll = async () => {
    if (!selectedStudent) return;
    try {
      await enrollInCourse({
        idCurso: course.idCurso,
        idUsuario: selectedStudent,
      });
      const updatedCourse = await getCourseById(groupId);
      setCourse(updatedCourse);
      updateAvailableStudents(updatedCourse, students);
      setShowEnrollDialog(false);
      setSelectedStudent(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleUnenroll = async (studentId) => {
    try {
      await unenrollFromCourse({
        idCurso: course.idCurso,
        idUsuario: studentId,
      });
      const updatedCourse = await getCourseById(groupId);
      setCourse(updatedCourse);
      updateAvailableStudents(updatedCourse, students);
    } catch (err) {
      setError(err);
    }
  };

  console.log(course);

  if (loading) return <TableSkeleton />;
  if (error)
    return (
      <ErrorContent
        message={error.message || `Failed to load ${title.toLowerCase()}.`}
      />
    );

  return (
    <div className="space-y-6 h-full py-20 px-15 bg-gray-200 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {course.nombreCurso}
        </h1>
        <button
          onClick={() => setShowEnrollDialog(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Inscribir Alumno
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-600">
        <nav className="-mb-px flex">
          <button
            className={`py-2 px-4 border-b-2 ${
              activeTab === "info"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Información del Curso
          </button>
          <button
            className={`ml-8 py-2 px-4 border-b-2 ${
              activeTab === "students"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() => setActiveTab("students")}
          >
            Alumnos Inscritos
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "info" && (
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Detalles del Curso
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Materia
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.Materium?.nombreMateria}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Profesor
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.Usuario?.nombreUsuario}{" "}
                  {course.Usuario?.apllPatUsuario}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Sede
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.Sede?.nombreSede}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Descripción
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {course.descripcionCurso}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white shadow rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Alumnos Inscritos
            </h2>
            {course.Inscripcions?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Apellido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-800">
                    {course.Inscripcions.map((inscripcion) => {
                      const student = students.find(
                        (s) => s.idUsuario === inscripcion.idAlumno
                      );
                      return (
                        <tr key={inscripcion.idInscripcion}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                            {student?.nombreUsuario}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                            {student?.apllPatUsuario}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                            {student?.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                            <button
                              onClick={() => handleUnenroll(student.idUsuario)}
                              className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                            >
                              <UserMinus className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No hay alumnos inscritos en este curso
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Inscripción */}
      {showEnrollDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Inscribir Alumno
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-400">
              Selecciona un alumno para inscribir en el curso
            </p>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4 dark:bg-gray-700 dark:text-white"
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Selecciona un alumno</option>
              {availableStudents.map((student) => (
                <option key={student.idUsuario} value={student.idUsuario}>
                  {student.nombreUsuario} {student.apllPatUsuario}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowEnrollDialog(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-900 dark:text-white dark:hover:text-white"
                onClick={handleEnroll}
                disabled={!selectedStudent}
              >
                Inscribir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupDetail;
