import React from "react";
import { AvatarCell } from "../components/common/UserAvatar.jsx";
import { formatDate } from "../utils/dateUtils";
import Icon from "../components/home/Icon";

// Columna de fecha de creación
const createdAtColumn = {
  header: "Created At",
  accessor: "createdAt",
  render: (row) => (
    <div className="flex justify-center">
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-cyan-900 text-cyan-200">
        <Icon name="calendar" className="w-3 h-3 mr-1" />
        {formatDate(row.createdAt)}
      </span>
    </div>
  ),
};

// Configuración de columnas base para usuarios
export const UserColumns = [
  {
    header: "Avatar",
    accessor: "avatar",
    render: (user) => <AvatarCell user={user} size="lg" />,
  },
  { header: "Name", accessor: "nombreUsuario" },
  { header: "Last Name", accessor: "apllPatUsuario" },
  { header: "Email", accessor: "email" },
];

//Configuración de columnas para administradores
export const adminColumns = [...UserColumns, createdAtColumn];

//Configuración de columnas para profesores
export const teacherColumns = [
  ...UserColumns,
  { header: "Branch", accessor: "branchName" },
  createdAtColumn,
];

//Configuración de columnas para estudiantes
export const studentColumns = [
  ...UserColumns,
  { header: "Branch", accessor: "branchName" },
  createdAtColumn,
];

export const branchColumns = [
  { header: "Branch", accessor: "nombreSede" },
  { header: "Address", accessor: "direccionSede" },
  { header: "Phone", accessor: "telefonoSede" },
  { header: "Email", accessor: "emailSede" },
];

export const subjectColumns = [
  { header: "Subject", accessor: "nombreMateria" },
  { header: "Description", accessor: "descripcionMateria" },
];

export const courseColumns = [
  { header: "Course", accessor: "nombreCurso" },
  { header: "Description", accessor: "descripcionCurso" },
  { header: "Subject", accessor: "nombreMateria" },
  {
    header: "Teacher",
    accessor: "profesor",
    render: (row) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <AvatarCell user={row.profesor} size="sm" />
        </div>
        <span className="text-left">{row.nombreProfesor}</span>
      </div>
    ),
  },
  { header: "Branch", accessor: "nombreSede" },
  createdAtColumn,
];
