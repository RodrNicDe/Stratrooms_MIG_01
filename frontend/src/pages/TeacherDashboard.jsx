import { Routes, Route } from "react-router-dom";
import Navbar from "../components/home/Navbar.jsx";
import Sidebar from "../components/home/Sidebar.jsx";
import Breadcrumb from "../components/home/Breadcrumb.jsx";
import Dashboard from "../components/teacher/Dashboard.jsx";
import LogoutPage from "../pages/Logout.jsx";
import GroupDetail from "../components/teacher/TeacherGroupDetail.jsx";
import Icon from "../components/home/Icon.jsx";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-auto">
        <Sidebar
          items={[
            {
              label: "My Groups",
              icon: <Icon name="group" className="w-6 h-6" />,
              route: "/groups",
            },
            {
              label: "Calendar",
              icon: <Icon name="calendar" className="w-6 h-6" />,
              route: "/calendar",
            },
          ]}
        />
        <div className="flex-1 relative">
          <Breadcrumb
            items={[
              { path: "", name: "Home" },
              { path: "groups", name: "My Groups" },
              { path: "calendar", name: "Calendar" },
            ]}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/groups" element={<Dashboard />} />
            <Route path="/groups/:groupId" element={<GroupDetail />} />
            <Route path="/calendar" element={<Dashboard />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
