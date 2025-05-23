import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-6 w-6" />;
      case "error":
        return <AlertTriangle className="h-6 w-6" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6" />;
      case "info":
        return <Info className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case "success":
        return "bg-emerald-500 text-white";
      case "error":
        return "bg-rose-500 text-white";
      case "warning":
        return "bg-amber-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const getTitle = () => {
    switch (notification.type) {
      case "success":
        return "Operation Successful";
      case "error":
        return "Error";
      case "warning":
        return "Warning";
      case "info":
        return "Information";
      default:
        return "";
    }
  };

  return (
    <Transition
      show={!!notification}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
      className="absolute top-full -left-10 mt-3 z-50 w-80"
    >
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg ${getBackgroundColor()}`}
        role="alert"
      >
        <div className="flex-shrink-0 pr-2">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-medium text-[16px]">{getTitle()}</h4>
          {notification.message && (
            <p
              className={`text-sm mt-1 opacity-90 ${
                notification.title ? "" : "font-medium"
              }`}
            >
              {notification.message}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 rounded-full p-1 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Transition>
  );
};

export default Notification;
