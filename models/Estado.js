module.exports = (sequelize, DataTypes) => {
  
  const estado = sequelize.define("estado", {
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

  return estado
  
}