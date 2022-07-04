const db = require('../models')

const Consulta = db.consulta

const addConsulta = async (req, res) => {

  try {
    const consulta = await Consulta.create({
      lesionId: req.body.consulta.lesion,
      fecha: req.body.consulta.fecha,
      dx: req.body.consulta.dx,
      tto: req.body.consulta.tto,
      observacion: req.body.consulta.observacion,
    })
    if (req.body.full) {
      return consulta
    } else {
      const lesion = await db.lesion.findByPk(req.body.lesion)
      lesion.update({ ultAct: req.body.consulta.fecha })
      res.status(200).send(consulta)
    }
  } catch (error) {
    console.log("Error: " + error.message)
  }
}

const getConsultas = async (req, res) => {

  let consultas = await Consulta.findAll({
    include: ["lesion"],
    order: [['createdAt', 'DESC']]
  })
  res.status(200).send(consultas)
}

const getConsultasByLesionId = async (req, res) => {

  let consultas = await Consulta.findAll({
    where: { lesionId: req.params.id },
    include: ["lesion"],
    order: [['createdAt', 'DESC']]
  })
  res.status(200).send(consultas)
}

const getConsultaById = async (req, res) => {

  let id = req.params.id
  let consulta = await Consulta.findOne({
    where: { id: id },
    include: ["lesion"]
  })
  res.status(200).send(consulta)
}

const deleteConsulta = async (req, res) => {

  let id = req.params.id
  try {
    await Consulta.destroy({
      where: { id: id },
    })
    res.status(200).send("Consulta id Nº " + id + " borrada")
  } catch (error) {
    console.log("Error: " + error.message)
  }
}

const updateConsulta = async (req, res) => {

  if (Object.keys(req.body).every(el => Object.keys(Consulta.rawAttributes).includes(el))) {
    await Consulta.update(req.body, { where: { id: req.params.id } })
    res.status(200).send("Datos actualizados correctamente")
  } else {
    res.status(400).send("Datos incorrectos para la actualización")
  }
}

module.exports = {
  addConsulta,
  getConsultas,
  getConsultaById,
  getConsultasByLesionId,
  deleteConsulta,
  updateConsulta
}