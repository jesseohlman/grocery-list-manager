'use strict';
module.exports = (sequelize, DataTypes) => {
  const item = sequelize.define('item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isAquired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  item.associate = function(models) {
    // associations can be defined here

    item.belongsTo(models.list, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    })
  };
  return item;
};