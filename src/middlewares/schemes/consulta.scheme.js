const Joi = require("joi");

let crearConsulta = Joi.object({
  consulta: Joi.object({
    lesionId: Joi.number().required(),
    fecha: Joi.date().required(),
    dx: Joi.string().required(),
    tto: Joi.string(),
    observacion: Joi.string(),
  }).required(),
});

let updateConsulta = Joi.object({
  consulta: Joi.object({
    fecha: Joi.date(),
    dx: Joi.string(),
    tto: Joi.string(),
    observacion: Joi.string(),
  })
    .required()
    .or("fecha", "dx", "tto", "observacion"),
});

module.exports = {
  crearConsulta,
  updateConsulta,
};
