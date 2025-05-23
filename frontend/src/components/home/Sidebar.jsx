import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCourses } from "../../services/courseService.js";
import { cn } from "../../utils/utils.js";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon.jsx";

const Sidebar = ({ items, userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isGroupsOpen, setIsGroupsOpen] = useState(
    location.pathname.startsWith("/groups")
  );
  const [courses, setCourses] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses(userId);
        setCourses(response);
      } catch (error) {
        console.error("Error obteniendo cursos:", error);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleItemClick = (route, hasChildren) => {
    if (hasChildren) {
      setIsGroupsOpen(!isGroupsOpen);
    } else {
      navigate(route);
    }
  };

  // Animation variants
  const courseVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  return (
    <div
      className={cn(
        "flex flex-col h-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20",
        "border-r border-gray-300 dark:border-gray-600"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-600 truncate">
        <button
          variant="ghost"
          onClick={toggleSidebar}
          className="flex items-center ml-2 text-gray-900 dark:text-white hover:text-primary-400 cursor-pointer"
        >
          {isOpen ? (
            <>
              <Icon name="arrow-left" className="w-6 h-6 mr-3" />
              Dashboard
            </>
          ) : (
            <>
              <Icon name="menu" className="w-6 h-6 mr-3" />
            </>
          )}
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item, index) => (
          <div key={index}>
            <div
              className={cn(
                "flex items-center gap-2 p-2 rounded-md transition-colors duration-30",
                "hover:text-white dark:hover:text-gray-900 hover:bg-primary-300",
                "cursor-pointer",
                "font-medium",
                { active: location.pathname === item.route && !item.children }
              )}
              onClick={() => handleItemClick(item.route, item.children)}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {isOpen && <span className="truncate">{item.label}</span>}
              </div>
              {item.route === "/groups" && (
                <Icon
                  name="arrow-down"
                  className={cn(
                    "w-12 h-6 transition-transform ml-auto",
                    isGroupsOpen ? "rotate-180" : "rotate-0"
                  )}
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el evento se propague al contenedor principal
                    setIsGroupsOpen(!isGroupsOpen);
                  }}
                />
              )}
            </div>
            <AnimatePresence>
              {isGroupsOpen &&
                isOpen &&
                item.route === "/groups" &&
                courses.length > 0 && (
                  <motion.div
                    variants={courseVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="ml-8 space-y-1"
                  >
                    {courses.slice(0, 5).map((course) => (
                      <div
                        key={course.idCurso}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md transition-colors duration-30",
                          "hover:text-white dark:hover:text-gray-900 hover:bg-primary-700 dark:hover:bg-primary-300",
                          "cursor-pointer",
                          "font-medium",
                          location.pathname === `/groups/${course.idCurso}`
                            ? "active"
                            : ""
                        )}
                        onClick={() => navigate(`/groups/${course.idCurso}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="course" className="w-6 h-6" />
                          <span className="truncate">{course.nombreCurso}</span>
                        </div>
                      </div>
                    ))}
                    {courses.length > 5 && (
                      <button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 cursor-pointer"
                        onClick={() => navigate("/groups")}
                      >
                        <div className="flex items-center gap-2">
                          <Icon name="plus" className="w-6 h-6" />
                          <span>See more...</span>
                        </div>
                      </button>
                    )}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
