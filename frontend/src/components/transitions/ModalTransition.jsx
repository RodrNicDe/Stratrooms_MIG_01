import { Transition } from "@headlessui/react";
import React from "react";

const ModalTransition = ({ isVisible, children }) => {
  return (
    <Transition.Root show={isVisible} as={React.Fragment}>
      {/* Overlay transition */}
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />
      </Transition.Child>

      {/* Content transition */}
      <Transition.Child
        as={React.Fragment}
        enter="ease-out duration-300 transform"
        enterFrom="opacity-0 translate-y-4 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0 scale-100"
        leaveTo="opacity-0 translate-y-4 scale-95"
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {children}
        </div>
      </Transition.Child>
    </Transition.Root>
  );
};

export default ModalTransition;
