function TableSkeleton() {
  return (
    <section className="flex h-full pt-20 pb-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        {/* Header */}
        <div className="relative overflow-hidden bg-gray-50 shadow-md dark:bg-gray-800 sm:rounded-lg mb-6">
          <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div>
              <div className="h-7 w-40 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mb-2"></div>
              <div className="h-4 w-60 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="h-10 w-36 bg-gray-200 rounded-lg dark:bg-gray-700 animate-pulse"></div>
          </div>
        </div>

        {/* Tabla */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {[...Array(6)].map((_, index) => (
                  <th key={index} className="px-6 py-3 text-center">
                    <div className="h-4 w-24 bg-gray-200 rounded-md dark:bg-gray-600 animate-pulse mx-auto"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`${
                    rowIndex < 4
                      ? "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      : "bg-gray-50 dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full dark:bg-gray-700 animate-pulse"></div>
                    </div>
                  </td>
                  {[...Array(4)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 text-center">
                      <div className="h-4 w-32 bg-gray-200 rounded-md dark:bg-gray-700 animate-pulse mx-auto"></div>
                    </td>
                  ))}
                  <td className="py-4 items-center text-right flex justify-center">
                    <div className="h-9 w-24 bg-gray-200 rounded-4xl dark:bg-gray-700 animate-pulse"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TableSkeleton;
