module.exports = (sequelize, DataTypes) => {
  
  const ubicacion = sequelize.define("ubicacion", {
    valor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { 
    timestamps: false,
    freezeTableName: true
  }
  )

  return ubicacion
  
}