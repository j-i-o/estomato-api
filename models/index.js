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

Object.keys(db).forEach(key => {
  if (db[key] && db[key].associate) {
    db[key].associate(db);
  }
});

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Re-sincronización lista')
  })

module.exports = db