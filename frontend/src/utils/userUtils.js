/**
 * Obtiene las iniciales de un usuario a partir de su nombre y apellido
 * @param {string} nombreUsuario - Nombre del usuario
 * @param {string} apllPatUsuario - Apellido del usuario
 * @returns {string} Iniciales en mayúsculas
 */
export const getInitials = (nombreUsuario, apllPatUsuario) => {
  if (!nombreUsuario || !apllPatUsuario) return "";
  return `${nombreUsuario.charAt(0)}${apllPatUsuario.charAt(0)}`.toUpperCase();
};

/**
 * Transforma los datos del usuario para el formulario
 * @param {Object} userData - Datos del usuario
 * @returns {Object} Datos transformados
 */
export const transformUserFormData = (userData) => {
  if (!userData) return {};
  const { password, branchName, ...rest } = userData;
  return rest;
};

/**
 * Maneja el almacenamiento de credenciales en localStorage
 * @param {Object} values - Valores del formulario
 * @param {string} values.email - Email del usuario
 * @param {boolean} values.rememberMe - Indicador de recordar credenciales
 */
export const handleCredentialsStorage = (values) => {
  if (values.rememberMe) {
    localStorage.setItem("rememberMe", "true");
    localStorage.setItem("rememberedEmail", values.email);
  } else {
    localStorage.removeItem("rememberMe");
    localStorage.removeItem("rememberedEmail");
  }
};
