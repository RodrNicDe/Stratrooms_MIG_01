import { useState } from "react";
import Icon from "../home/Icon";

function Calendar() {
  const [currentDate] = useState(new Date());

  return (
    <section className="flex h-full py-20 bg-gray-200 dark:bg-gray-900">
      <div className="w-full max-w-screen-xl px-4 mx-auto lg:px-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Calendar
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
              {currentDate.toLocaleString("es-ES", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Icon name="chevron_left" className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Icon name="chevron_right" className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 dark:text-white py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square border border-gray-200 dark:border-gray-700 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              >
                <span className="text-sm text-gray-600 dark:text-white">
                  {index + 1 <= 31 ? index + 1 : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendar;
