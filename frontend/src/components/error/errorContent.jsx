import { useNavigate } from "react-router-dom";

function ErrorContent({ message }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen flex flex-col items-center justify-center text-gray-900 dark:text-white">
      <img
        src="https://flowbite-admin-dashboard.vercel.app/images/illustrations/404.svg"
        alt="Page Not Found Illustration"
        className="max-w-sm w-full mb-8"
      />
      <h1 className="text-3xl font-bold mb-4 text-center">Page not found</h1>

      <div className="w-auto border border-red-400 rounded-lg px-4 py-1.5 mb-6">
        <span className="block text-red-700 text-center font-medium text-lg">
          {message}
        </span>
      </div>

      <p className="text-gray-400 mb-6 text-center">
        Oops! Looks like you followed a bad link. If you think this is a problem
        with us, please tell us.
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none flex items-center"
        onClick={handleGoHome}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          ></path>
        </svg>
        Go back home
      </button>
    </div>
  );
}

export default ErrorContent;
