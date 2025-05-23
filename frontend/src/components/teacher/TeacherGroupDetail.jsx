import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  enrollInCourse,
  unenrollFromCourse,
} from "../../services/courseService";
import { getAllStudents } from "../../services/studentService";
import { UserPlus, UserMinus } from "lucide-react";
import { formatDate } from "../../utils/dateUtils";
import Icon from "../home/Icon";

function TeacherGroupDetail() {
  const { id } = useParams();
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
        const [courseData, studentsData] = await Promise.all([
          getCourseById(id),
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
  }, [id]);

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
      const updatedCourse = await getCourseById(id);
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
      const updatedCourse = await getCourseById(id);
      setCourse(updatedCourse);
      updateAvailableStudents(updatedCourse, students);
    } catch (err) {
      setError(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Course Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {course.nombreCurso}
            </h1>
            <p className="text-gray-600 mt-1">{course.descripcionCurso}</p>
          </div>
          <button
            onClick={() => setShowEnrollDialog(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Enroll Student
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Subject</p>
            <p className="font-medium">{course.Materia?.nombreMateria}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Branch</p>
            <p className="font-medium">{course.Sede?.nombreSede}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Enrolled Students</p>
            <p className="font-medium">{course.Inscripcions?.length || 0}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Start Date</p>
            <p className="font-medium">{formatDate(course.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`py-4 px-6 border-b-2 ${
                activeTab === "info"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Información General
            </button>
            <button
              className={`py-4 px-6 border-b-2 ${
                activeTab === "students"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("students")}
            >
              Alumnos
            </button>
            <button
              className={`py-4 px-6 border-b-2 ${
                activeTab === "assignments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("assignments")}
            >
              Tareas
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Course Description
                </h3>
                <p className="mt-2 text-gray-600">
                  {course.descripcionCurso || "No description"}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Additional Details
                </h3>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Teacher
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {course.Usuario?.nombreUsuario}{" "}
                      {course.Usuario?.apllPatUsuario}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Teacher's Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {course.Usuario?.email}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              {course.Inscripcions?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrollment Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {course.Inscripcions.map((inscripcion) => {
                        const student = students.find(
                          (s) => s.idUsuario === inscripcion.idAlumno
                        );
                        return (
                          <tr key={inscripcion.idInscripcion}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {student?.nombreUsuario}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {student?.apllPatUsuario}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {student?.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatDate(inscripcion.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() =>
                                  handleUnenroll(student.idUsuario)
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                <UserMinus className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon
                    name="users"
                    className="mx-auto h-12 w-12 text-gray-400"
                  />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No students
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by enrolling students in this course.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="text-center py-12">
              <Icon
                name="assignment"
                className="mx-auto h-12 w-12 text-gray-400"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No assignments
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Start by creating assignments for this course.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Icon name="add" className="h-5 w-5 mr-2" />
                  New Assignment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Enroll Student</h2>
            <p className="text-gray-600 mb-4">
              Select a student to enroll in the course
            </p>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              value={selectedStudent || ""}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">Select a student</option>
              {availableStudents.map((student) => (
                <option key={student.idUsuario} value={student.idUsuario}>
                  {student.nombreUsuario} {student.apllPatUsuario}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowEnrollDialog(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                onClick={handleEnroll}
                disabled={!selectedStudent}
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherGroupDetail;
