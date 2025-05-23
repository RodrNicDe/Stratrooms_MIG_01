"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Sedes", "telefonoSede", {
      type: Sequelize.STRING(20),
      allowNull: false,
    });
    await queryInterface.addColumn("Sedes", "emailSede", {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
    await queryInterface.removeColumn("Sedes", "logoUrl");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Sedes", "telefonoSede");
    await queryInterface.removeColumn("Sedes", "emailSede");
    await queryInterface.addColumn("Sedes", "logoUrl", {
      //Re-agrega la columna eliminada
      type: Sequelize.STRING(255),
      allowNull: true,
    });
  },
};
