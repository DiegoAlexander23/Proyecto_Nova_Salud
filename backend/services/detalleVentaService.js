const DetalleVenta = require('../models/detalleVentaModel');

class DetalleVentaService { 
    constructor() {}

    async getAllDetalleVentas() {
        const DetalleVentas = await DetalleVenta.findAll()
        return DetalleVentas;
    }
    
    async filterById(id) {
        const DetalleVenta = await DetalleVenta.findByPk(id);
        return DetalleVenta;
    }

    async create(data) {
        return await DetalleVenta.create(data);
    }

    async update(id, data) {
        return await DetalleVenta.update(data, {
            where: { id: id }
        });
    }

    async delete(id) {
        return await DetalleVenta.destroy({
            where: { id: id }
        });
    }
}

module.exports = DetalleVentaService;