const db = require('../models')

const Paciente = db.paciente

const addPaciente = async (req, res) => {

  const paciente = await Paciente.create({
    nombre: req.body.paciente.nombre,
    apellido: req.body.paciente.apellido,
    edad: req.body.paciente.edad,
    observacion: req.body.paciente.observacion ?? '',
    sexoId: req.body.paciente.sexo
  })
  if (req.body.full) {
    return paciente
  } else {
    res.status(200).send(paciente)
  }
}

const getPacientes = async (req, res) => {

  let pacientes = await Paciente.findAll({ include: ["sexo"] })
  res.status(200).send(pacientes)
}

const getPacienteById = async (req, res) => {

  let paciente = await Paciente.findByPk(req.params.id)
  if(paciente){
    res.status(200).send(paciente)
  }else{
    res.status(404).send("No existe ningún paciente con id = " + req.params.id)
  }
}

const deletePaciente = async (req, res) => {

  const paciente = await Paciente.findByPk(req.params.id)
  if (paciente) {
    try {
      let lesiones = await db.lesion.findAll({ where: { pacienteId: paciente.id } })
      for (let lesion of lesiones) {
        await db.consulta.destroy({
          where: { lesionId: lesion.id }
        })
      }
      await db.lesion.destroy({
        where: { pacienteId: paciente.id },
      })
      await Paciente.destroy({
        where: { id: paciente.id }
      })
      res.status(200).send('Paciente borrado con todos sus registros')
    } catch (error) {
      res.status(500).send("Error: " + error.message)
    }
  } else {
    res.status(404).send("No existe ningún paciente con id = " + req.params.id)
  }
}

const updatePaciente = async (req, res) => {
  
  const paciente = await Paciente.findByPk(req.params.id)
  if(paciente){
    try {
      if (Object.keys(req.body).every(el => Object.keys(Paciente.rawAttributes).includes(el))) {
        await Paciente.update(req.body, { where: { id: req.params.id } })
        res.status(200).send("Datos actualizados correctamente")
      } else {
        res.status(400).send("Datos incorrectos para la actualización")
      }
    } catch (error) {
      res.status(500).send("Error: " + error.message)
    }
  }else{
    res.status(404).send("No existe ningún paciente con id = " + req.params.id)
  }

}

module.exports = {
  addPaciente,
  getPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente
}