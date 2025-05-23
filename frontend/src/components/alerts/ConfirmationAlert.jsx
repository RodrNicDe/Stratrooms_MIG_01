import React from "react";
import { Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { AlertTriangle } from "lucide-react";

const ConfirmationAlert = ({
  isOpen,
  onCancel,
  onDelete,
  username,
  type,
  message,
}) => {
  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]" />
      </Transition.Child>

      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[60] overflow-y-auto">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center p-6 relative">
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300"
            >
              <X size={20} />
            </button>

            {/* Warning icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-300 dark:bg-gray-700 p-3 rounded-md">
                <AlertTriangle className="h-8 w-8 text-gray-500" />
              </div>
            </div>

            {/* Message */}
            <div className="mb-8 mt-8">
              <p className="text-gray-900 dark:text-white mb-2">
                <span className="text-blue-500">@{username}</span>, are you sure
                you want to delete this {type} "{message}" from platform?
              </p>
              <p className="text-gray-500 text-sm pt-3">
                This action cannot be undone.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={onCancel}
                className="px-5 py-2 bg-gray-600 rounded-4xl text-white hover:bg-gray-700 transition-colors"
              >
                No, cancel
              </button>
              <button
                onClick={onDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-4xl hover:bg-red-600 transition-colors"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};

export default ConfirmationAlert;
