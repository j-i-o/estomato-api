const db = require('../models')

module.exports = (sequelize, DataTypes) => {

  const Lesion = sequelize.define("lesion", {
    ultAct: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
    {
      freezeTableName: true
    }
  )

  return Lesion

}