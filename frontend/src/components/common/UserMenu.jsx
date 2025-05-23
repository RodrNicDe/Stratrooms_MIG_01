import { useState, useRef, useEffect, useContext } from "react";
import { User, Settings, Lock, Bell, HelpCircle, LogOut } from "lucide-react";
import { AuthContext } from "../../context/authContext.jsx";
import UserAvatar from "./UserAvatar.jsx";

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { icon: <User className="h-4 w-4" />, label: "My Profile" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" },
    { icon: <Lock className="h-4 w-4" />, label: "Privacy" },
    { icon: <Bell className="h-4 w-4" />, label: "Notifications" },
    { divider: true },
    { icon: <HelpCircle className="h-4 w-4" />, label: "Help" },
    {
      icon: <LogOut className="h-4 w-4 text-red-500" />,
      label: "Sign Out",
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-end gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      >
        <div className="hidden sm:block font-medium dark:text-white">
          <div>{user.nombreUsuario}</div>
          <div className="text-sm flex justify-end text-gray-500 dark:text-gray-400">
            {user.apllPatUsuario}
          </div>
        </div>
        <UserAvatar user={user} size="md" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700 py-2">
          {menuItems.map((item, index) =>
            item.divider ? (
              <div
                key={`divider-${index}`}
                className="my-2 border-t border-gray-200 dark:border-gray-700"
              />
            ) : (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full px-4 py-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                  item.danger
                    ? "text-red-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400">
                  {item.icon}
                </span>
                <span
                  className={`text-sm font-medium ${
                    item.danger ? "text-red-500" : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
