'use strict';
const { DataTypes, INTEGER, STRING } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("certificate_table",{
      certificate_id: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'customer_tables',
        //   key: 'customer_id',
        // },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      operations: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("certificate_table");
  }
};
