"use strict";

const models = require("../models/index");

const lesiones = [
  { valor: "Mácula" },
  { valor: "Pápula" },
  { valor: "Nódulo" },
  { valor: "Úlcera" },
  { valor: "Ulceración" },
  { valor: "Erosión" },
  { valor: "Vesícula" },
  { valor: "Ampolla" },
  { valor: "Pústula" },
  { valor: "Placa" },
  { valor: "SBA" },
  { valor: "Tumor" },
  { valor: "Quiste" },
  { valor: "Costra" },
  { valor: "Pseudomembrana" },
  { valor: "Eritema" },
  { valor: "Leucoplasia" },
  { valor: "Verruga" },
  { valor: "Papiloma" },
  { valor: "Flictena" },
  { valor: "Puntos Fordyce" },
  { valor: "Granuloma" },
  { valor: "Liquen" },
  { valor: "Micosis" },
  { valor: "Parasitosis" },
  { valor: "Abseso" },
  { valor: "Mucocele" },
  { valor: "Quelitis" },
  { valor: "Sarcoma de Kaposi" },
  { valor: "Angioma" },
  { valor: "Hemangioma" },
  { valor: "Reacción liquenoide" },
  { valor: "Carcinoma" },
  { valor: "Nevo" },
  { valor: "Hiperplasia paraprotética" },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([models.nombLesion.bulkCreate(lesiones)]);
  },
};
