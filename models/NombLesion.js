module.exports = (sequelize, DataTypes) => {
  
  const nombLesion = sequelize.define("nombLesion", {
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

  return nombLesion

}