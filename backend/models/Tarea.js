export default (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    idTarea: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCurso: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cursos",
        key: "idCurso",
      },
    },
    tituloTarea: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcionTarea: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fechaSubidaTarea: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fechaEntregaTarea: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estadoTarea: {
      type: DataTypes.STRING(10),
      defaultValue: "PENDIENTE",
      validate: {
        isIn: [["PENDIENTE", "CERRADA"]],
      },
    },
    archivoTarea: {
      type: DataTypes.STRING(255),
    },
  });

  Tarea.associate = (models) => {
    Tarea.belongsTo(models.Curso, { foreignKey: "idCurso" });
    Tarea.hasMany(models.Entrega, { foreignKey: "idTarea" });
  };

  return Tarea;
};
