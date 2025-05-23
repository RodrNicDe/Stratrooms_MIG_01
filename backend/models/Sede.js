export default (sequelize, DataTypes) => {
  const Sede = sequelize.define("Sede", {
    idSede: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreSede: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccionSede: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    telefonoSede: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    emailSede: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  });

  Sede.associate = (models) => {
    Sede.hasMany(models.Usuario, { foreignKey: "idSede" });
    Sede.hasMany(models.Curso, { foreignKey: "idSede" });
  };

  return Sede;
};
