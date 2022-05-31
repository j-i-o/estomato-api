const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASS, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
}
)

sequelize.authenticate()
  .then(() => {
    console.log('Connected...')
  })
  .catch(err => {
    console.log('Error' + err)
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.paciente = require('./Paciente.js')(sequelize, DataTypes)
db.nombLesion = require('./NombLesion.js')(sequelize, DataTypes)
db.sexo = require('./Sexo.js')(sequelize, DataTypes)
db.estado = require('./Estado.js')(sequelize, DataTypes)
db.ubicacion = require('./Ubicacion.js')(sequelize, DataTypes)
db.lesion = require('./Lesion.js')(sequelize, DataTypes)
db.consulta = require('./Consulta.js')(sequelize, DataTypes)

//Paciente
db.sexo.hasMany(db.paciente, { as: "paciente" })
db.paciente.belongsTo(db.sexo, {
  foreignKey: "sexoId",
  as: "sexo"
})

//Lesion
db.nombLesion.hasMany(db.lesion, { as: "lesion" })
db.lesion.belongsTo(db.nombLesion, {
  foreignKey: "nombLesionId",
  as: "nombLesion"
})
db.paciente.hasMany(db.lesion, { as: "lesion" })
db.lesion.belongsTo(db.paciente, {
  foreignKey: "pacienteId",
  as: "paciente"
})
db.estado.hasMany(db.lesion, { as: "lesion" })
db.lesion.belongsTo(db.estado, {
  foreignKey: "estadoId",
  as: "estado"
})

//Consulta
db.lesion.hasMany(db.consulta, { as: "consulta" })
db.consulta.belongsTo(db.lesion, {
  foreignKey: "lesionId",
  as: "lesion"
})

//LesionUbicacion
db.lesion.belongsToMany(db.ubicacion, { through: 'LesionUbicacion' })
db.ubicacion.belongsToMany(db.lesion, { through: 'LesionUbicacion' })

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sincronización lista')
  })

module.exports = db