"use strict"; //para que no se puedan usar variables no definidas

module.exports = (sequelize, DataTypes) => {
  let Sexo = sequelize.define("sexo",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
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
      freezeTableName: true,
    }
  );

  Sexo.associate = models => {
    Sexo.hasMany(models.paciente, { as: "paciente" });
  };

  return Sexo;
};
