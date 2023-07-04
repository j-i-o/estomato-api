const Joi = require("joi");

let crearPaciente = Joi.object({
  paciente: Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    sexo: Joi.number().required(),
    edad: Joi.number(),
    observacion: Joi.string(),
  }).required(),
});

let updatePaciente = Joi.object({
  paciente: Joi.object({
    nombre: Joi.string(),
    apellido: Joi.string(),
    sexo: Joi.number(),
    edad: Joi.number(),
    observacion: Joi.string(),
  })
    .required()
    .or("nombre", "apellido", "sexo", "edad", "observacion"),
});

module.exports = {
  crearPaciente,
  updatePaciente,
};
