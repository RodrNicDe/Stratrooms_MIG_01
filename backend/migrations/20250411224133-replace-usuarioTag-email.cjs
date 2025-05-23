"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Eliminar usuarioTag
    await queryInterface.removeColumn("Usuarios", "usuarioTag");

    // 2. Agregar email como campo obligatorio y único
    await queryInterface.addColumn("Usuarios", "email", {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir cambios
    await queryInterface.removeColumn("Usuarios", "email");

    await queryInterface.addColumn("Usuarios", "usuarioTag", {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    });
  },
};
