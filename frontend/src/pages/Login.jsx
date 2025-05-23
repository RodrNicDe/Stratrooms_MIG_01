import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { AuthContext } from "../context/authContext.jsx";
import { handleCredentialsStorage } from "../utils/userUtils.js";
import * as Yup from "yup";
import ThemeSwitcher from "../components/home/ThemeSwitcher.jsx";
import Icon from "../components/home/Icon.jsx";
import fondo from "../assets/fondo.png";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const rememberedEmail = localStorage.getItem("rememberedEmail") || "";
  const remembered = localStorage.getItem("rememberMe") === "true";

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      email: rememberedEmail,
      password: "",
      rememberMe: remembered,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values);
        handleCredentialsStorage(values);
        navigate("/");
      } catch (error) {
        setErrors({ general: error.message || "Login error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${fondo})`,
      }}
    >
      <div className="absolute top-0 right-0 p-4">
        <ThemeSwitcher enableHover={false} />
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <p className="text-body flex items-center mb-6 text-5xl font-semibold text-white">
          <Icon name="logo" className="w-10 h-10 pl-0 mr-2 text-white" />
          Stratrooms
        </p>
        <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="name@company.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm font-medium mt-2 text-primary-500">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className={`bg-gray-50 border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full pr-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    className="absolute inset-y-0 right-0 pr-5 flex items-center"
                    onPointerDown={() => setShowPassword(true)}
                    onPointerUp={() => setShowPassword(false)}
                    onPointerLeave={() => setShowPassword(false)}
                  >
                    {showPassword ? (
                      <Icon
                        name="eye-slash"
                        className="w-6 h-6 text-gray-800 dark:text-white"
                      />
                    ) : (
                      <Icon
                        name="eye"
                        className="w-6 h-6 text-gray-800 dark:text-white"
                      />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm font-medium mt-2 text-primary-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="rememberMe"
                      className="text-gray-500 dark:text-gray-300 cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              {formik.errors.general && (
                <p className="text-sm font-semibold mt-2 text-primary-500">
                  {formik.errors.general}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-400 dark:focus:ring-primary-800"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
