const db = require('../models')

//Paciente
db.sexo.hasMany(db.paciente, {as: "paciente"})
db.paciente.belongsTo(db.sexo, {
  foreignKey: "sexoId",
  as: "sexo"
})

//Lesion
db.nombLesion.hasMany(db.lesion, {as: "lesion"})
db.lesion.belongsTo(db.nombLesion, {
  foreignKey: "nombLesionId",
  as: "nombLesion"
})
db.paciente.hasMany(db.lesion, {as: "lesion"})
db.lesion.belongsTo(db.paciente, {
  foreignKey: "pacienteId",
  as: "paciente"
})
db.estado.hasMany(db.lesion, {as: "lesion"})
db.lesion.belongsTo(db.estado, {
  foreignKey: "estadoId",
  as: "estado"
})

//Consulta
db.lesion.hasMany(db.consulta, {as: "consulta"})
db.consulta.belongsTo(db.lesion, {
  foreignKey: "lesionId",
  as: "lesion"
})

//LesionUbicacion
db.lesion.belongsToMany(db.ubicacion, { through: 'LesionUbicacion'})
db.ubicacion.belongsToMany(db.lesion, { through: 'LesionUbicacion'})
