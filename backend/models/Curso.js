export default (sequelize, DataTypes) => {
  const Curso = sequelize.define("Curso", {
    idCurso: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idMateria: {
      type: DataTypes.INTEGER,
      references: {
        model: "Materia",
        key: "idMateria",
      },
    },
    idProfesor: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "idUsuario",
      },
    },
    idSede: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sedes",
        key: "idSede",
      },
    },
    nombreCurso: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcionCurso: {
      type: DataTypes.TEXT,
    },
  });

  Curso.associate = (models) => {
    Curso.belongsTo(models.Materia, { foreignKey: "idMateria" });
    Curso.belongsTo(models.Usuario, { foreignKey: "idProfesor" });
    Curso.belongsTo(models.Sede, { foreignKey: "idSede" });
    Curso.hasMany(models.Inscripcion, { foreignKey: "idCurso" });
    Curso.hasMany(models.Tarea, { foreignKey: "idCurso" });
  };

  return Curso;
};
