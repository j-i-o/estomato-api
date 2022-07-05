const db = require('../models')

const Lesion = db.lesion

/* 
  paciente = int
  estado = int
  nombLesion = int
  ubicacion = [int]
*/
const addLesion = async (req, res) => {
  try{
    const lesion = await Lesion.create({
      pacienteId: req.body.lesion.paciente,
      estadoId: req.body.lesion.estado,
      nombLesionId: req.body.lesion.nombLesion,
      ultAct: req.body.consulta.fecha ?? new Date()
    })
    let ubicaciones = req.body.lesion.ubicacion
    ubicaciones.forEach(async id => {
      const ubicacion = await db.ubicacion.findByPk(id)
      await lesion.addUbicacion(ubicacion)
    });
  
    if(req.body.full){
      return lesion
    }else{
      res.status(200).send(lesion)
    }
  }catch(error){
    console.log("ERROR: ", error.message)
  }
}

const getLesiones = async (req, res) => {

  let lesiones = await Lesion.findAll({
    include: [
      "nombLesion",
      "paciente",
      "estado",
      { model: db.ubicacion, through: { attributes: [] } }
    ],
    order: [['ultAct', 'DESC']],
  })
  res.status(200).send(lesiones)
}


const getLesionById = async (req, res) => {

  let id = req.params.id
  let lesion = await Lesion.findOne({ where: { id: id }, include: db.ubicacion })
  res.status(200).send(lesion)
}

const deleteLesion = async (req, res) => {

  let id = req.params.id
  try {
    await db.consulta.destroy({
      where: { lesionId: id }
    })
    await Lesion.destroy({
      where: { id: id },
    })
    res.status(200).send("Lesión id Nº " + id + " borrada y todas sus consultas")
  } catch (error) {
    console.log("Error: " + error.message)
  }
}

const updateLesion = async (req, res) => {

  if (Object.keys(req.body).includes("pacienteId")) {
    res.status(400).send("No es posible cambiar el paciente que esté ligado a la lesión")
  } else {
    if (Object.keys(req.body).every(el => Object.keys(Lesion.rawAttributes).includes(el))) {
      const lesion = await Lesion.update(req.body, { where: { id: req.params.id } })
      res.status(200).send("Datos actualizados correctamente")
    } else {
      res.status(400).send("Datos incorrectos para la actualización")
    }
  }
}

module.exports = {
  addLesion,
  getLesiones,
  getLesionById,
  deleteLesion,
  updateLesion,
}