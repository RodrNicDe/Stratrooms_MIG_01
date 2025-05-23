export default (sequelize, DataTypes) => {
  const Entrega = sequelize.define("Entrega", {
    idEntrega: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idTarea: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tareas",
        key: "idTarea",
      },
    },
    idAlumno: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "idUsuario",
      },
    },
    fechaTareaEntregada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    archivoEntrega: {
      type: DataTypes.STRING(255),
    },
    calificacionEntrega: {
      type: DataTypes.DECIMAL(5, 2),
    },
    comentarioProfesorEntrega: {
      type: DataTypes.TEXT,
    },
  });

  Entrega.associate = (models) => {
    Entrega.belongsTo(models.Tarea, { foreignKey: "idTarea" });
    Entrega.belongsTo(models.Usuario, { foreignKey: "idAlumno" });
  };

  return Entrega;
};
