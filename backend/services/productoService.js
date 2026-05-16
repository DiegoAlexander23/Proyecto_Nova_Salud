const Producto = require('../models/productoModel');

class ProductoService { 
    constructor() {}

    async getAllProductos() {
        const Productos = await Producto.findAll();
        return Productos;
    }
    
    async filterById(id) {
        const Producto = await Producto.findByPk(id);
        return Producto;
    }

    async create(data) {
        return await Producto.create(data);
    }

    async update(id, data) {
        return await Producto.update(data, {
            where: { id: id }
        });
    }

    async delete(id) {
        return await Producto.destroy({
            where: { id: id }
        });
    }
}

module.exports = ProductoService;