const dbConfig = require('../config/config.js');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.ENVIRONMENT || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// const sequelize = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASS, {
//   host: dbConfig.HOST,'use strict';

// const process = require('process');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync()
// sequelize.sync({force: true})


module.exports = db;

  // dialect: dbConfig.dialect,
  // operatorsAliases: false,

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connected...')
//   })
//   .catch(err => {
//     console.log('Error' + err)
//   })

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize

// db.paciente = require('./Paciente.js')(sequelize, DataTypes)
// db.nombLesion = require('./NombLesion.js')(sequelize, DataTypes)
// db.sexo = require('./Sexo.js')(sequelize, DataTypes)
// db.estado = require('./Estado.js')(sequelize, DataTypes)
// db.ubicacion = require('./Ubicacion.js')(sequelize, DataTypes)
// db.lesion = require('./Lesion.js')(sequelize, DataTypes)
// db.consulta = require('./Consulta.js')(sequelize, DataTypes)

// Object.keys(db).forEach(key => {
//   if (db[key] && db[key].associate) {
//     db[key].associate(db);
//   }
// });

// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Re-sincronización lista')
//   })

// module.exports = db