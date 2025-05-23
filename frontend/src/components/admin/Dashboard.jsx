import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Welcome from "../home/Welcome.jsx";
import Branches from "./Branches.jsx";
import Subjects from "./Subjects.jsx";
import AdminsDetail from "./AdminsDetail.jsx";
import TeachersDetail from "./TeachersDetail.jsx";
import StudentsDetail from "./StudentsDetail.jsx";
import Groups from "./Groups.jsx";
import GroupDetail from "./GroupDetail.jsx";

function Dashboard() {
  const location = useLocation();
  const [content, setContent] = useState(null);
  useEffect(() => {
    switch (location.pathname) {
      case "/branches":
        setContent(<Branches />);
        break;
      case "/subjects":
        setContent(<Subjects />);
        break;
      case "/admins":
        setContent(<AdminsDetail />);
        break;
      case "/teachers":
        setContent(<TeachersDetail />);
        break;
      case "/students":
        setContent(<StudentsDetail />);
        break;
      case "/groups":
        setContent(<Groups />);
        break;
      case location.pathname.startsWith("/groups/") &&
        location.pathname !== "/groups":
        setContent(<GroupDetail />);
        break;
      default:
        setContent(<Welcome />);
        break;
    }
  }, [location.pathname]);

  return <>{content}</>;
}

export default Dashboard;
