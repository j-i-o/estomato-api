const Joi = require("joi");

let crearPaciente = Joi.object({
  paciente: Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    sexo: Joi.number().required(),
    edad: Joi.number(),
    observacion: Joi.string(),
  }).required()
});

module.exports = {
  crearPaciente,
};
