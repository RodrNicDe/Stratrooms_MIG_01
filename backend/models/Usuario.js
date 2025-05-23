export default (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipoUsuario: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["ADMINISTRADOR", "ALUMNO", "PROFESOR"]],
      },
    },
    idSede: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sedes",
        key: "idSede",
      },
    },
    nombreUsuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apllPatUsuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imgUrlUsuario: {
      type: DataTypes.STRING(255),
      validate: {
        isUrl: true,
      },
    },
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Curso, { foreignKey: "idProfesor" });
    Usuario.hasMany(models.Inscripcion, { foreignKey: "idAlumno" });
    Usuario.hasMany(models.Entrega, { foreignKey: "idAlumno" });
    Usuario.belongsTo(models.Sede, { foreignKey: "idSede" });
  };

  return Usuario;
};
