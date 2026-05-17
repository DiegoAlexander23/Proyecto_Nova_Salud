const { DataTypes } = require('sequelize')
const sequelize = require('../database/connection')

const Producto = sequelize.define('Producto',{
    nombre: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.STRING, allowNull: false},
    precio: {type: DataTypes.DOUBLE, allowNull: false},
    stock: {type: DataTypes.INTEGER, allowNull: false},
    categoria: {type: DataTypes.STRING, allowNull: false}
})
module.exports = Producto