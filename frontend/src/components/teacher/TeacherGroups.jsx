import React, { useState } from "react";

const CourseContent = ({ course }) => {
  const [announcementText, setAnnouncementText] = useState("");

  const [announcements, setAnnouncements] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("posts");

  // Manejo de errores para evitar que el componente falle si course es undefined

  if (!course || typeof course !== "object") {
    return (
      <div className="p-4">
        <p className="text-red-500">Error: Course information not provided.</p>
      </div>
    );
  }

  const handlePostAnnouncement = () => {
    if (announcementText.trim()) {
      setAnnouncements([announcementText, ...announcements]);

      setAnnouncementText("");

      setIsEditing(false);
    }
  };

  const handleCancelAnnouncement = () => {
    setAnnouncementText("");

    setIsEditing(false);
  };

  const applyBold = () => {
    setAnnouncementText(`${announcementText} **texto en negritas** `);
  };

  const applyItalic = () => {
    setAnnouncementText(`${announcementText} *texto en cursivas* `);
  };

  const applyList = () => {
    setAnnouncementText(`${announcementText}\n- Elemento de lista`);
  };

  // Función para manejar el clic en el botón "New"

  const handleNewTask = () => {
    console.log("Crear nueva tarea");
  };

  return (
    <div className="p-4">
      {/* Botón para regresar */}

      <div className="max-w-4xl mx-auto mb-4">
        <button className="text-green-800 hover:underline" onClick={onBack}>
          ← Back to My Groups
        </button>
      </div>

      {/* Pestañas de navegación */}

      <div className="max-w-4xl mx-auto border-b mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 ${
              activeTab === "posts"
                ? "border-b-2 border-blue-500 text-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            posts
          </button>

          <button
            onClick={() => setActiveTab("class work")}
            className={`px-4 py-2 ${
              activeTab === "class work"
                ? "border-b-2 border-blue-500 text-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            class work
          </button>

          <button
            onClick={() => setActiveTab("people")}
            className={`px-4 py-2 ${
              activeTab === "people"
                ? "border-b-2 border-blue-500 text-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            people
          </button>

          <button
            onClick={() => setActiveTab("school grades")}
            className={`px-4 py-2 ${
              activeTab === "school grades"
                ? "border-b-2 border-blue-500 text-gray-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            school grades
          </button>
        </div>
      </div>

      {/* Contenido principal */}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {course?.nombre || "Curso no encontrado"}
        </h2>

        <div className="flex space-x-4">
          {/* Sección izquierda */}

          <div className="w-1/3 text-left">
            {activeTab === "people" && (
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-left">
                  People
                </h3>

                {course?.people?.length > 0 ? (
                  course.people.map((person, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-start"
                    >
                      <p className="text-gray-600">{person}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No people in this course.</p>
                )}
              </div>
            )}

            {activeTab === "school grades" && (
              <div className="text-left">
                <div className="w-full flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    School Grades
                  </h3>

                  <button className="ml-auto text-gray-600 hover:text-gray-800">
                    <img className="w-5 h-5" src={Point} alt="options" />
                  </button>
                </div>

                {course?.schoolGrades ? (
                  Object.entries(course.schoolGrades).map(
                    ([student, grade], index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-start"
                      >
                        <p className="text-gray-600">
                          {student}: {grade}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-600">
                    No hay calificaciones disponibles.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Sección derecha */}

          <div className="w-2/3 flex justify-center">
            <div className="w-full max-w-md">
              {/* Formulario de anuncios en la pestaña 'posts' */}

              {activeTab === "posts" && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Announce something to your class
                    </h3>

                    <button
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => setIsEditing(false)}
                    >
                      <img
                        className="w-5 h-5 mr-[2px]"
                        src={Close}
                        alt="close"
                      />
                    </button>
                  </div>

                  {isEditing ? (
                    <>
                      <div className="flex space-x-2 mb-2">
                        <button
                          onClick={applyBold}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Bold"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Bold}
                            alt="bold"
                          />
                        </button>

                        <button
                          onClick={applyItalic}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Italic"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Italic}
                            alt="italic"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Underline"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Under}
                            alt="underline"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="List"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={List}
                            alt="list"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Attach"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Clip}
                            alt="adjuntar"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Align Left"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Left}
                            alt="left"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Align Center"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Center}
                            alt="center"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Align Right"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Right}
                            alt="right"
                          />
                        </button>

                        <button
                          onClick={applyList}
                          className="p-1 text-gray-600 hover:bg-gray-200 rounded"
                          title="Justify"
                        >
                          <img
                            className="w-5 h-5 mr-[2px]"
                            src={Justify}
                            alt="justificado"
                          />
                        </button>
                      </div>

                      <textarea
                        className="w-full p-2 border rounded-lg mb-2"
                        rows="4"
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        placeholder="Write your announcement..."
                      />

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleCancelAnnouncement}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handlePostAnnouncement}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Post
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full p-2 text-gray-600 border border-dashed rounded-lg hover:bg-gray-200"
                    >
                      Click to write an announcement...
                    </button>
                  )}
                </div>
              )}

              {/* Contenido de las pestañas */}

              <div className="mt-4">
                {activeTab === "posts" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                      Announcements
                    </h3>

                    {announcements.length > 0 ? (
                      announcements.map((announcement, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-4 rounded-lg mb-2"
                        >
                          <p className="text-gray-600">{announcement}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 text-center">
                        No hay publicaciones todavía.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "class work" && (
                  <div>
                    <button
                      onClick={handleNewTask}
                      className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      New
                    </button>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Class Work
                    </h3>

                    <p className="text-gray-600">No hay tareas asignadas.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
