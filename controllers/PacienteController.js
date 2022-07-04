const db = require('../models')

const Paciente = db.paciente

const addPaciente = async (req, res ) => {

  const paciente = await Paciente.create({
    nombre: req.body.paciente.nombre,
    apellido: req.body.paciente.apellido,
    edad: req.body.paciente.edad,
    observacion: req.body.paciente.observacion ?? '',
    sexoId: req.body.paciente.sexo
  })
  if(req.body.full){
    return paciente
  }else{
    res.status(200).send(paciente)
  }
}

const getPacientes = async (req, res) => {

  let pacientes = await Paciente.findAll({ include: ["sexo"] })
  res.status(200).send(pacientes)
}

const getPacienteById = async (req, res) => {

  let id = req.params.id
  let paciente = await Paciente.findByPk(id)
  res.status(200).send(paciente)
}

const deletePaciente = async (req, res) => {

  let id = req.params.id
  try {
    let lesiones = await db.lesion.findAll({ where: { pacienteId: id } })
    for (let lesion of lesiones) {
      await db.consulta.destroy({
        where: { lesionId: lesion.id }
      })
    }
    await db.lesion.destroy({
      where: { pacienteId: id },
    })
    await Paciente.destroy({
      where: { id: id }
    })
    res.status(200).send('Paciente borrado con todos sus registros')
  } catch (error) {
    res.status(500).send("Error: " + error.message)
  }
}

const updatePaciente = async (req, res) => {

  //! Te tira que todo bien cuando no existe la fila elegida para actualizar
  if (Object.keys(req.body).every(el => Object.keys(Paciente.rawAttributes).includes(el))) {
    await Paciente.update(req.body, { where: { id: req.params.id } })
    res.status(200).send("Datos actualizados correctamente")
  } else {
    res.status(400).send("Datos incorrectos para la actualización")
  }
}

module.exports = {
  addPaciente,
  getPacientes,
  getPacienteById,
  updatePaciente,
  deletePaciente
}