import { Routes, Route } from "react-router-dom";
import Navbar from "../components/home/Navbar.jsx";
import Sidebar from "../components/home/Sidebar.jsx";
import Breadcrumb from "../components/home/Breadcrumb.jsx";
import Dashboard from "../components/admin/Dashboard.jsx";
import LogoutPage from "../pages/Logout.jsx";
import GroupDetail from "../components/admin/GroupDetail.jsx";
import Icon from "../components/home/Icon.jsx";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-auto">
        <Sidebar
          items={[
            {
              label: "Branches",
              icon: <Icon name="branch" className="w-6 h-6" />,
              route: "/branches",
            },
            {
              label: "Subjects",
              icon: <Icon name="subject" className="w-6 h-6" />,
              route: "/subjects",
            },
            {
              label: "Admins",
              icon: <Icon name="admin" className="w-6 h-6" />,
              route: "/admins",
            },
            {
              label: "Teachers",
              icon: <Icon name="teacher" className="w-6 h-6" />,
              route: "/teachers",
            },
            {
              label: "Students",
              icon: <Icon name="student" className="w-6 h-6" />,
              route: "/students",
            },
            {
              label: "Groups",
              icon: <Icon name="group" className="w-6 h-6" />,
              route: "/groups",
            },
          ]}
        />
        <div className="flex-1 relative">
          <Breadcrumb
            items={[
              { path: "", name: "Home" },
              { path: "branches", name: "Branches" },
              { path: "subjects", name: "Subjects" },
              { path: "admins", name: "Admins" },
              { path: "teachers", name: "Teachers" },
              { path: "students", name: "Students" },
              { path: "groups", name: "Groups" },
            ]}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/branches" element={<Dashboard />} />
            <Route path="/subjects" element={<Dashboard />} />
            <Route path="/admins" element={<Dashboard />} />
            <Route path="/teachers" element={<Dashboard />} />
            <Route path="/students" element={<Dashboard />} />
            <Route path="/groups" element={<Dashboard />} />
            <Route path="/groups/:groupId" element={<GroupDetail />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
