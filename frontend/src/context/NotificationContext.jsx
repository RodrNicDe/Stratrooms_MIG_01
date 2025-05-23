import { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const showNotification = (type, message, title = "", userAvatar = null) => {
    const newNotification = {
      id: Date.now().toString(),
      type,
      message,
      title,
      userAvatar,
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        month: "short",
        day: "numeric",
      }),
      read: false,
    };

    setNotification(newNotification);
    setNotificationHistory((prev) => [newNotification, ...prev]);
    setHasUnreadNotifications(true);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const markAllAsRead = () => {
    setNotificationHistory((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
    setHasUnreadNotifications(false);
  };

  const clearHistory = () => {
    setNotificationHistory([]);
    setHasUnreadNotifications(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationHistory,
        hasUnreadNotifications,
        showNotification,
        closeNotification,
        markAllAsRead,
        clearHistory,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
