import React from "react";
import Icon from "../home/Icon.jsx";

export const TableContent = ({
  data = [],
  columns = [],
  onAdd,
  onEdit,
  onRowClick,
  title = "Items",
}) => {
  const cols = columns;

  return (
    <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        {/* Header */}
        <div className="relative overflow-hidden bg-gray-50 shadow-md dark:bg-gray-800 sm:rounded-lg mb-6">
          <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div>
              <h5 className="mr-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-primary-700 from-primary-300">
                {title}
              </h5>
              <p className="text-gray-500 dark:text-gray-400">
                Manage your {title.toLowerCase()} or add a new one.{" "}
              </p>
            </div>
            {onAdd && (
              <button
                onClick={onAdd}
                type="button"
                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r to-primary-700 from-primary-400 focus:ring-4 focus:ring-primary-400 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 mr-2 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Add new {title.slice(0, -1)}
              </button>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {cols.map((col) => (
                  <th
                    key={col.accessor || col.header}
                    className="px-6 py-3 text-center"
                  >
                    {col.header.charAt(0).toUpperCase() + col.header.slice(1)}
                  </th>
                ))}
                {onEdit && <th className="px-6 py-3 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={cols.length + (onEdit ? 1 : 0)}
                    className="px-6 py-4 text-center text-gray-700 dark:text-gray-300"
                  >
                    No data available.
                  </td>
                </tr>
              )}
              {data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx < data.length - 1
                      ? "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      : "bg-gray-50 dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {cols.map((col, i) => (
                    <td key={i} className="px-3 py-1 text-center">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {onEdit && (
                    <td className="py-4 items-center text-right flex justify-center gap-2">
                      {onEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(row);
                          }}
                          type="button"
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-4xl text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          <Icon name="user-edit" className="w-6 h-6 mr-1" />
                          Edit
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
