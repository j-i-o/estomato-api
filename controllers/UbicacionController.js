const db = require('../models')

const Ubicacion = db.ubicacion

const addUbicacion = async (req, res) => {
  let info = {
    valor: req.body.valor,
  }

  const ubicacion = await Ubicacion.create(info)
  res.status(200).send(ubicacion)
}

const getUbicaciones = async (req, res) => {

  let ubicaciones = await Ubicacion.findAll({})
  res.status(200).send(ubicaciones)
}


const getUbicacionById = async (req, res) => {

  let id = req.params.id
  let ubicacion = await Ubicacion.findByPk(id)
  res.status(200).send(ubicacion)
}



module.exports = {
  addUbicacion,
  getUbicacionById,
  getUbicaciones,
}