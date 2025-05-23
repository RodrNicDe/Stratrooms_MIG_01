"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Usuarios", "contraseña", "password");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Usuarios", "password", "contraseña");
  },
};
