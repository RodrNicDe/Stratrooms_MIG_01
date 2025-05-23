import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import Icon from "./Icon.jsx";

const WelcomeContent = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="font-body text-6xl font-bold mb-3">
        Welcome{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary-800 from-primary-300">
          {user.nombreUsuario}
        </span>
      </div>
      <div className="text-5xl font-semibold mb-28 mt-10">
        meet{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-primary-300 from-primary-800">
          Stratrooms
        </span>
      </div>
      <div
        className="w-1/3 h-1/3 flex items-center justify-center relative text-gray-800 dark:text-white"
        aria-hidden="true"
      >
        <Icon name="logo" className="w-full h-full" />
      </div>
    </div>
  );
};

export default WelcomeContent;
