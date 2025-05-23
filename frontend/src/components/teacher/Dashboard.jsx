import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Welcome from "../home/Welcome.jsx";
import Groups from "./TeacherGroups.jsx";
import GroupDetail from "./TeacherGroupDetail.jsx";
import Calendar from "./Calendar.jsx";

function Dashboard() {
  const location = useLocation();
  const [content, setContent] = useState(null);

  const courses = [
    {
      id: 1,

      nombre: "Curso de Matemáticas",

      descripcion: "Grupo de matemáticas para 1er semestre.",

      posts: [],

      classWork: [],

      people: ["Estudiante A", "Estudiante B", "Profesor"],

      schoolGrades: { "Estudiante A": 85, "Estudiante B": 90 },

      nextDeliveries: "You don’t have any tasks for this week",
    },

    {
      id: 2,

      nombre: "Curso de Física",

      descripcion: "Grupo de física para 2do semestre.",

      posts: [],

      classWork: [],

      people: ["Estudiante C", "Estudiante D", "Profesor"],

      schoolGrades: { "Estudiante C": 78, "Estudiante D": 92 },

      nextDeliveries: "Entrega de proyecto el viernes",
    },

    {
      id: 3,

      nombre: "Curso de Química",

      descripcion: "Grupo de química para 3er semestre.",

      posts: [],

      classWork: [],

      people: ["Estudiante E", "Estudiante F", "Profesor"],

      schoolGrades: { "Estudiante E": 88, "Estudiante F": 95 },

      nextDeliveries: "Examen final el próximo lunes",
    },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case "/groups":
        setContent(<Groups curses={courses} />);
        break;
      case location.pathname.startsWith("/groups/") &&
        location.pathname !== "/groups":
        setContent(<GroupDetail />);
        break;
      case "/calendar":
        setContent(<Calendar />);
        break;
      default:
        setContent(<Welcome />);
        break;
    }
  }, [location.pathname]);

  return <>{content}</>;
}

export default Dashboard;
