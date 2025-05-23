import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageSquare,
  UserPlus,
  CreditCard,
  Heart,
  Eye,
  User,
} from "lucide-react";
import Icon from "../home/Icon.jsx";
import UserAvatar from "../common/UserAvatar.jsx";

const NotificationTypes = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  USER: "user",
};

const NotificationDropdown = ({ notifications = [], onClose, hasUnread }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getIcon = (type, userAvatar = null) => {
    switch (type) {
      case NotificationTypes.SUCCESS:
        return <Heart className="h-3 w-3 text-white" />;
      case NotificationTypes.ERROR:
        return <MessageSquare className="h-3 w-3 text-white" />;
      case NotificationTypes.WARNING:
        return <UserPlus className="h-3 w-3 text-white" />;
      case NotificationTypes.INFO:
        return <CreditCard className="h-3 w-3 text-white" />;
      case NotificationTypes.USER:
        return userAvatar ? (
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <UserAvatar user={userAvatar} size="sm" />
          </div>
        ) : (
          <User className="h-3 w-3 text-white" />
        );
      default:
        return null;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case NotificationTypes.SUCCESS:
        return "bg-emerald-500";
      case NotificationTypes.ERROR:
        return "bg-rose-500";
      case NotificationTypes.WARNING:
        return "bg-amber-500";
      case NotificationTypes.INFO:
        return "bg-blue-500";
      case NotificationTypes.USER:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 mt-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      >
        <Icon
          name={hasUnread ? "notification-on" : "notification-off"}
          className="w-6 h-6"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Notifications
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          notification.type === NotificationTypes.USER
                            ? ""
                            : getBadgeColor(notification.type)
                        }`}
                      >
                        {getIcon(notification.type, notification.userAvatar)}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm text-gray-800 dark:text-gray-200">
                        <span className="font-medium">
                          {notification.title}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            )}
          </div>
          <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Eye className="h-4 w-4 mr-2" />
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
