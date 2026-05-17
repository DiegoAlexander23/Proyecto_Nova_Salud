const Venta = require('../models/ventaModel');

class VentaService { 

    async getAllventas() {
        return await Venta.findAll();
    }
    
    async filterById(id) {
        return await Venta.findByPk(id);
    }

    async create(data) {
        return await Venta.create(data);
    }

    async update(id, data) {
        return await Venta.update(data, {
            where: { id }
        });
    }

    async delete(id) {
        return await Venta.destroy({
            where: { id }
        });
    }
}

module.exports = VentaService;