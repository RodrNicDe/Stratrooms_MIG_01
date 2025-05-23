export default (sequelize, DataTypes) => {
  const Materia = sequelize.define("Materia", {
    idMateria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreMateria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcionMateria: {
      type: DataTypes.TEXT,
    },
  });

  Materia.associate = (models) => {
    Materia.hasMany(models.Curso, { foreignKey: "idMateria" });
  };

  return Materia;
};
