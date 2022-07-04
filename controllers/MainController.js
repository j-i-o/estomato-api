const db = require('../models')
const mainRepo = require('../repository/MainRepository')
const pacienteController = require('../controllers/pacienteController')
const lesionController = require('../controllers/lesionController')
const consultaController = require('../controllers/consultaController')

/*
  paciente:
    nombre, apellido, sexo, edad, observacion
  lesion:
    nombLesion, estado, ubicacion
  consulta:
    fecha, dx, tto, observacion
*/
const createPacienteCompleto = async (req, res) => {

  try{
    req.body.full = true
    let paciente = await pacienteController.addPaciente(req, res)
    req.body.lesion.paciente = paciente.id
    let lesion = await lesionController.addLesion(req, res)
    req.body.consulta.lesion = lesion.id
    let consulta = await consultaController.addConsulta(req, res)
  
    paciente.setDataValue('lesion', lesion)
    paciente.setDataValue('consulta', consulta)
  
    res.status(200).send(paciente)
  }catch(error){
    console.log("Error: " + error.message)
  }
}

const getHome = async (req, res) => {

  let datos = await db.paciente.findAll({ include: ["sexo"] })

  for (let paciente of datos) {
    try {
      lesion = await db.lesion.findOne({
        where: { pacienteId: paciente.id },
        order: [['ultAct', 'DESC']],
        include: [
          "nombLesion",
          "estado",
          { model: db.ubicacion, through: { attributes: [] } } //attributes: [] para no retornar la join table
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
  createPacienteCompleto,
  getHome,
}