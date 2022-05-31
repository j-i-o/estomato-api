module.exports = (sequelize, DataTypes) => {
  
  const Paciente = sequelize.define("paciente", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    observacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  },
  { 
    timestamps: false,
    freezeTableName: true
  }
  )
  //! VER TEMA DE ASOCIACIONES FUERA DEL INDEX
  
  return Paciente
}