"use strict";

const models = require("../models/index");

const sexos = [
  { valor: "Mujer" },
  { valor: "Hombre" },
  { valor: "No binarie" }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([models.sexo.bulkCreate(sexos)]);
  },
};
