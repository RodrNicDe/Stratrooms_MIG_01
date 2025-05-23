export default (sequelize, DataTypes) => {
  const Inscripcion = sequelize.define("Inscripcion", {
    idInscripcion: {
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
    idAlumno: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "idUsuario",
      },
    },
  });

  Inscripcion.associate = (models) => {
    Inscripcion.belongsTo(models.Curso, { foreignKey: "idCurso" });
    Inscripcion.belongsTo(models.Usuario, { foreignKey: "idAlumno" });
  };

  return Inscripcion;
};
