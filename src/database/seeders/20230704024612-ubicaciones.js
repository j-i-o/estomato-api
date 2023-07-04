"use strict";

const models = require("../models/index");

const ubicaciones = [
  { posicion: 1, valor: "Lengua" },
  { posicion: 2, valor: "Lengua dorsal" },
  { posicion: 3, valor: "Lengua ventral" },
  { posicion: 4, valor: "Labio inferior" },
  { posicion: 5, valor: "Labio superior" },
  { posicion: 6, valor: "Paladar blando" },
  { posicion: 7, valor: "Paladar duro" },
  { posicion: 8, valor: "Trígono retromolar derecho" },
  { posicion: 9, valor: "Trígono retromolar izquierdo" },
  { posicion: 10, valor: "Carrillo derecho" },
  { posicion: 11, valor: "Carrillo izquierdo" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      ubicaciones.map(async (data) => {
        const [record, created] = await models.ubicacion.findOrCreate({
          where: { id: data.posicion },
          defaults: { valor: data.valor },
        });
      }),
    ]);
  },
};
