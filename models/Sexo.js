module.exports = (sequelize, DataTypes) => {
  
  const Sexo = sequelize.define("sexo", {
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

  return Sexo
  
}