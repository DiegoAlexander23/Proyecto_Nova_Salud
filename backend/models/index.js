const Usuario = require('./userModel')
const Producto = require('./productoModel')
const Venta = require('./ventaModel')
const DetalleVenta = require('./detalleVentaModel')


Usuario.hasMany(Venta, {
    foreignKey: 'usuarioId'
})

Venta.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
})

Venta.hasMany(DetalleVenta, {
    foreignKey: 'ventaId'
})

DetalleVenta.belongsTo(Venta, {
    foreignKey: 'ventaId'
})

Producto.hasMany(DetalleVenta, {
    foreignKey: 'productoId'
})

DetalleVenta.belongsTo(Producto, {
    foreignKey: 'productoId'
})

module.exports = {
    Usuario,
    Producto,
    Venta,
    DetalleVenta
}