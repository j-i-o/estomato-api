const models = require('../database/models/index')

const Consulta = models.consulta

const addConsulta = async (req, res) => {

  try {
    const consulta = await Consulta.create({
      lesionId: req.body.consulta.lesion,
      fecha: req.body.consulta.fecha,
      dx: req.body.consulta.dx,
      tto: req.body.consulta.tto,
      observacion: req.body.consulta.observacion,
    })
    //Se necesita actualizar algo en el registro para que actualice automaticamente el updatedAt
    const lesion = await models.lesion.findByPk(req.body.consulta.lesion)
    const date = new Date(req.body.consulta.fecha)
    lesion.update({ ultima_consulta: date })
    if (req.body.full) {
      return consulta
    } else {
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

  const lesion = await models.lesion.findByPk(req.params.id)
  if(lesion){
    let consultas = await Consulta.findAll({
      where: { lesionId: lesion.id },
      include: ["lesion"],
      order: [['createdAt', 'DESC']]
    })
    res.status(200).send(consultas)
  }else{
    res.status(404).send("No existe ninguna lesión con id = " + req.params.id)
  }
}

const getConsultaById = async (req, res) => {

  const consulta = await Consulta.findOne({
    where: { id: req.params.id },
    include: ["lesion"]
  })
  if(consulta){
    res.status(200).send(consulta)
  }else{
    res.status(404).send("No existe ninguna consulta con id = " + req.params.id)
  }
}

const deleteConsulta = async (req, res) => {

  const consulta = Consulta.findByPk(req.params.id)
  if(consulta){
    try {
      await Consulta.destroy({
        where: { id: id },
      })
      res.status(200).send("Consulta id Nº " + consulta.id + " borrada")
    } catch (error) {
      console.log("Error: " + error.message)
    }
  }else{
    res.status(404).send("No existe ninguna consulta con id = " + req.params.id)
  }
}

const updateConsulta = async (req, res) => {

  const consulta = Consulta.findByPk(req.params.id)
  if(consulta){
    if (Object.keys(req.body).every(el => Object.keys(Consulta.rawAttributes).includes(el))) {
      await Consulta.update(req.body, { where: { id: consulta.id } })
      res.status(200).send("Datos actualizados correctamente")
    } else {
      res.status(400).send("Datos incorrectos para la actualización")
    }
  }else{
    res.status(404).send("No existe ninguna consulta con id = " + req.params.id)
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