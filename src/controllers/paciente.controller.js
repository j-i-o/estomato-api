const models = require("../database/models/index");

module.exports = {
  addPaciente: async (req, res) => {
    const paciente = await models.paciente.create({
      nombre: req.body.paciente.nombre,
      apellido: req.body.paciente.apellido,
      edad: req.body.paciente.edad,
      observacion: req.body.paciente.observacion ?? "",
      sexoId: req.body.paciente.sexo,
    });

    if (req.body.full) {
      return paciente;
    } else {
      res.status(200).send(paciente);
    }
  },

  getPacientes: async (req, res) => {
    let pacientes = await models.paciente.findAll({ include: ["sexo"] });
    res.status(200).send(pacientes);
  },

  getPacienteById: async (req, res) => {
    let paciente = await models.paciente.findByPk(req.params.id);
    if (paciente) {
      res.status(200).send(paciente);
    } else {
      res
        .status(404)
        .send("No existe ningún paciente con id = " + req.params.id);
    }
  },

  deletePaciente: async (req, res) => {
    const paciente = await models.paciente.findByPk(req.params.id);
    if (paciente) {
      try {
        let lesiones = await db.lesion.findAll({
          where: { pacienteId: paciente.id },
        });
        for (let lesion of lesiones) {
          await db.consulta.destroy({
            where: { lesionId: lesion.id },
          });
        }
        await db.lesion.destroy({
          where: { pacienteId: paciente.id },
        });
        await models.paciente.destroy({
          where: { id: paciente.id },
        });
        res.status(200).send("Paciente borrado con todos sus registros.");
      } catch (error) {
        res.status(500).send("Error: " + error.message);
      }
    } else {
      res
        .status(404)
        .send("No existe ningún paciente con id = " + req.params.id);
    }
  },

  updatePaciente: async (req, res) => {
    const paciente = await models.paciente.findByPk(req.params.id);
    const body = req.body.paciente
    if (paciente) {
      console.log("PACIENTE: ", paciente);
      console.log("REQ: ", req.body);
      try {
        if (
          Object.keys(body).every((el) =>
            Object.keys(models.paciente.rawAttributes).includes(el)
          )
        ) {
          await models.paciente.update(body, { where: { id: req.params.id } });
          res.status(200).send("Datos actualizados correctamente");
        } else {
          res.status(400).send("Datos incorrectos para la actualización");
        }
      } catch (error) {
        res.status(500).send("Error: " + error.message);
      }
    } else {
      res
        .status(404)
        .send("No existe ningún paciente con id = " + req.params.id);
    }
  },
};
