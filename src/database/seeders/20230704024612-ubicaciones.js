"use strict";

const models = require("../models/index");

const ubicaciones = [
  { valor: "Lengua" },
  { valor: "Lengua dorsal" },
  { valor: "Lengua ventral" },
  { valor: "Labio inferior" },
  { valor: "Labio superior" },
  { valor: "Paladar blando" },
  { valor: "Paladar duro" },
  { valor: "Trígono retromolar derecho" },
  { valor: "Trígono retromolar izquierdo" },
  { valor: "Carrillo derecho" },
  { valor: "Carrillo izquierdo" },
  { valor: "Frenillos" },
  { valor: "Encía" },
  { valor: "Reborde alveolar superior" },
  { valor: "Reborde alveolar inferior" },
  { valor: "Labio superior semimucosa" },
  { valor: "Labio inferior semimucosa" },
  { valor: "Bermellón labial" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([models.ubicacion.bulkCreate(ubicaciones)]);
  },
};
