'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.Item, {
      foreignKey: "itemId",
      onDelete: "CASCADE"
    });
  };
  return user;
};