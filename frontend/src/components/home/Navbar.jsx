import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useNotification } from "../../context/NotificationContext.jsx";
import Notification from "../notifications/Notification.jsx";
import NotificationDropdown from "../notifications/NotificationDropdown.jsx";
import ThemeSwitcher from "./ThemeSwitcher.jsx";
import Icon from "./Icon.jsx";
import UserMenu from "../common/UserMenu.jsx";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const {
    notification,
    closeNotification,
    notificationHistory,
    hasUnreadNotifications,
    markAllAsRead,
  } = useNotification();

  return (
    <nav className="relative w-full px-4 py-2 border-b border-gray-300 dark:border-gray-600 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <Icon name="logo" className="w-15 h-15" />
        <span className="text-2xl font-semibold pr-10 text-black dark:text-white">
          Stratrooms
        </span>
      </div>
      {/* Actions: Notifications, Theme Switcher, Divider, Avatar */}
      <div className="flex items-center">
        {/* Notification dropdown */}
        <div className="relative">
          <NotificationDropdown
            notifications={notificationHistory}
            onClose={markAllAsRead}
            hasUnread={hasUnreadNotifications}
          />
          {/* Toast Notification */}
          <Notification
            notification={notification}
            onClose={closeNotification}
          />
        </div>
        {/* Theme switcher */}
        <div className="mx-2">
          <ThemeSwitcher />
        </div>
        {/* Divider */}
        <div className="h-6 w-0.5 bg-gray-300 dark:bg-gray-600 mx-2" />
        {/* User menu */}
        <UserMenu user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
