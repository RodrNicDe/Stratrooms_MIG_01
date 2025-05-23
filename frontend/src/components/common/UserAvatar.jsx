import React from "react";
import { getInitials } from "../../utils/userUtils";

/**
 * Componente de avatar de usuario que muestra imagen o iniciales
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.user - Datos del usuario
 * @param {string} props.className - Clases adicionales para el contenedor
 * @param {string} props.size - Tamaño del avatar ('sm', 'md', 'lg')
 */
export const UserAvatar = ({ user, className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const containerClass = `flex justify-center ${className}`;
  const avatarSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={containerClass}>
      {user?.imgUrlUsuario ? (
        <img
          src={user.imgUrlUsuario}
          alt={`${user.nombreUsuario} ${user.apllPatUsuario}`}
          className={`${avatarSize} rounded-full object-cover`}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : (
        <div
          className={`${avatarSize} rounded-full flex items-center justify-center font-medium text-gray-600 dark:text-gray-300 bg-gray-300 dark:bg-gray-700`}
        >
          {getInitials(user?.nombreUsuario, user?.apllPatUsuario)}
        </div>
      )}
    </div>
  );
};

/**
 * Componente de celda de avatar para tablas
 */
export const AvatarCell = ({ user, size = "lg" }) => (
  <UserAvatar user={user} size={size} />
);

export default UserAvatar;
