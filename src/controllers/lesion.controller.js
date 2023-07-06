const models = require('../database/models/index')

const Lesion = models.lesion

/* 
  paciente = int
  estado = int
  nombLesion = int
  ubicacion = [int]
*/
const addLesion = async (req, res) => {
  try {
    const lesion = await Lesion.create({
      pacienteId: req.body.lesion.paciente,
      estadoId: req.body.lesion.estado,
      nombLesionId: req.body.lesion.nombLesion,
    })
    let ubicaciones = req.body.lesion.ubicacion
    ubicaciones.forEach(async id => {
      const ubicacion = await models.ubicacion.findByPk(id)
      await lesion.addUbicacion(ubicacion)
    });

    if (req.body.full) {
      return lesion
    } else {
      res.status(200).send(lesion)
    }
  } catch (error) {
    console.log("ERROR: ", error.message)
  }
}

const getLesiones = async (req, res) => {

  let lesiones = await Lesion.findAll({
    include: [
      "nombLesion",
      "paciente",
      "estado",
      { model: models.ubicacion, through: { attributes: [] } }
    ],
    order: [['ultima_consulta', 'DESC']],
  })
  res.status(200).send(lesiones)
}


const getLesionById = async (req, res) => {

  let lesion = await Lesion.findOne({ where: { id: req.params.id }, include: models.ubicacion })
  if (lesion) {
    res.status(200).send(lesion)
  } else {
    res.status(404).send("No existe ningúna lesión con id = " + req.params.id)
  }
}

const getLesionByPacienteId = async (req, res) => {

  let paciente = await models.paciente.findByPk(req.params.id)
  if (paciente) {
    const lesion = await Lesion.findAll({
      include: [
        "nombLesion",
        "paciente",
        "estado",
        { model: models.ubicacion, through: { attributes: [] } }
      ],
      where: { pacienteId: paciente.id },
      order: [['ultima_consulta', 'DESC']],
    })
    
    res.status(200).send(lesion)
  } else {
    res.status(404).send("No existe ningún paciente con id = " + req.params.id)
  }
}

const deleteLesion = async (req, res) => {

  const lesion = Lesion.findByPk(req.params.id)
  if (lesion) {
    try {
      await models.consulta.destroy({
        where: { lesionId: lesion.id }
      })
      await Lesion.destroy({
        where: { id: lesion.id },
      })
      res.status(200).send("Lesión id Nº " + lesion.id + " borrada y todas sus consultas")
    } catch (error) {
      console.log("Error: " + error.message)
    }
  } else {
    res.status(404).send("No existe ningúna lesión con id = " + req.params.id)
  }
}

const updateLesion = async (req, res) => {

  const lesion = Lesion.findByPk(req.params.id)
  if (lesion) {
    if (Object.keys(req.body).includes("pacienteId")) {
      res.status(400).send("No es posible cambiar el paciente que esté ligado a la lesión")
    } else {
      try {
        if (Object.keys(req.body).every(el => Object.keys(Lesion.rawAttributes).includes(el))) {
          const lesion = await Lesion.update(req.body, { where: { id: req.params.id } })
          res.status(200).send("Datos actualizados correctamente")
        } else {
          res.status(400).send("Datos incorrectos para la actualización")
        }
      } catch (error) {
        console.log("Error: " + error.message)
      }
    }
  } else {
    res.status(404).send("No existe ningúna lesión con id = " + req.params.id)
  }
}

module.exports = {
  addLesion,
  getLesiones,
  getLesionById,
  getLesionByPacienteId,
  deleteLesion,
  updateLesion,
}