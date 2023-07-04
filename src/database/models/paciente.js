'use strict' //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {

  let Paciente = sequelize.define("paciente", //defino el modelo de la tabla paciente
    { 
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
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
      },
      observacion: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
      }
    },
    {
      paranoid: true,
      freezeTableName: true
    }
  )

  Paciente.associate = models => {
    Paciente.belongsTo(models.sexo, {
      foreignKey: "sexoId",
      as: "sexo"
    })
    Paciente.hasMany(models.lesion, { as: "lesion" })
  };

  return Paciente
}