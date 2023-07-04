const models = require('../database/models/index')

const NombLesion = models.nombLesion

const addNombLesion = async (req, res) => {
  let info = {
    valor: req.body.valor,
  }

  const nombLesion = await NombLesion.create(info)
  res.status(200).send(nombLesion)
}

const getNombLesiones = async (req, res) => {

  let nombLesiones = await NombLesion.findAll({})
  res.status(200).send(nombLesiones)
}


const getNombLesionById = async (req, res) => {

  let id = req.params.id
  let nombLesion = await NombLesion.findByPk(id)
  res.status(200).send(nombLesion)
}

module.exports = {
  addNombLesion,
  getNombLesionById,
  getNombLesiones,
}