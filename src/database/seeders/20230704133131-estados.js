"use strict";

const models = require("../models/index");

const estados = [
  { valor: "En estudio" },
  { valor: "Biopsia" },
  { valor: "Dx Def." },
  { valor: "En control" },
  { valor: "Alta" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([models.estado.bulkCreate(estados)]);
  },
};
