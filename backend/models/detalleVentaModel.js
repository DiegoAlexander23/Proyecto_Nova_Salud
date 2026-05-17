const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const DetalleVenta = sequelize.define('DetalleVenta', {

    ventaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    subtotal: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
})

module.exports = DetalleVenta