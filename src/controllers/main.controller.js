const models = require('../database/models/index')
const mainRepo = require('../repository/MainRepository')
const pacienteController = require('./paciente.controller')
const lesionController = require('./lesion.controller')
const consultaController = require('./consulta.controller')

/*
  paciente:
    nombre, apellido, sexo, edad, observacion
  lesion:
    nombLesion, estado, ubicacion
  consulta:
    fecha, dx, tto, observacion
*/
const createPacienteFull = async (req, res) => {

  try {
    req.body.full = true
    req.body.pac = true
    let paciente = await pacienteController.addPaciente(req, res)
    req.body.lesion.paciente = paciente.id
    let lesion = await createLesionFull(req, res)

    paciente.setDataValue('lesion', lesion)

    res.status(200).send(paciente)
  } catch (error) {
    console.log("Error: " + error.message)
  }
}

const createLesionFull = async (req, res) => {
  try {
    req.body.full = true
    let lesion = await lesionController.addLesion(req, res)
    req.body.consulta.lesion = lesion.id
    let consulta = await consultaController.addConsulta(req, res)

    lesion.setDataValue('consulta', consulta)

    if(req.body.pac){
      console.log("PAC TRUE", pac)
      return lesion
    }else{
      console.log("PAC FALSE")
      res.status(200).send(lesion)
    }
  } catch (error) {
    console.log("Error: " + error.message)
  }
}

const getHome = async (req, res) => {
  let datos = await models.paciente.findAll({ include: ["sexo"] })

  for (let paciente of datos) {
    try {
      lesion = await models.lesion.findOne({
        where: { pacienteId: paciente.id },
        order: [['updated_at', 'DESC']],
        include: [
          "nombLesion",
          "estado",
          { model: models.ubicacion, through: { attributes: [] } } //attributes: [] para no retornar la join table
        ]
      })
      const ultimaConsulta = await mainRepo.getUltimaConsulta(lesion.id)
      lesion.setDataValue('consulta', ultimaConsulta)
      paciente.setDataValue('lesion', lesion);    //default toString() borra otras propiedades adicionales del modelo
    } catch (error) {
      console.log("Error: " + error.message)
    }
  }

  res.status(200).send(datos)
}

module.exports = {
  createPacienteFull,
  createLesionFull,
  getHome,
}