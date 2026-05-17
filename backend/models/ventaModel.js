const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Venta = sequelize.define('Venta', {

    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    total: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = Venta