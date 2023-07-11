const Joi = require("joi");

let crearLesion = Joi.object({
  lesion: Joi.object({
    pacienteId: Joi.number().required(),
    nombLesionId: Joi.number().required(),
    estadoId: Joi.number().required(),
    lesionUbicacion: Joi.array().items(Joi.number().required()).required(),
  }).required(),
});

let updateLesion = Joi.object({
  lesion: Joi.object({
    nombLesionId: Joi.number(),
    estadoId: Joi.number(),
    lesionUbicacion: Joi.array().items(Joi.number().required()),
  })
    .required()
    .or("nombLesionId", "estadoId", "lesionUbicacion"),
});

module.exports = {
  crearLesion,
  updateLesion,
};
