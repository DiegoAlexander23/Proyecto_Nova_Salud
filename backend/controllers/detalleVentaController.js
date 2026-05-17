const DetalleVentaService = require('../services/detalleVentaService')
const detalleVentaService = new DetalleVentaService

exports.getAllDetalleVentas = async (req, res) => {
    try {
        const detalleVentas = await detalleVentaService.getAllDetalleVentas();
        res.status(200).json(Array.isArray(detalleVentas) ? detalleVentas : []);
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json([]); 
    }
}

exports.getDetalleVenta = async (req, res) => {
    const id = req.params.id
    const detalleVenta = await detalleVentaService.filterById(id)
    if (!detalleVenta) {
        return res.status(400).json({ 'message': "Detalle de venta no encontrado" })
    }
    res.status(200).json(detalleVenta)
}

exports.createDetalleVenta = async (req, res) => {
    try {
        let data = req.body; 
        
        console.log("Datos recibidos en el servidor:", data);

        await detalleVentaService.create(data);
        res.status(201).send("Detalle de venta Registrado");
    } catch (error) {
        console.error("ERROR AL CREAR:", error.message);
        res.status(500).json({ "error": error.message });
    }
}
exports.updateDetalleVenta = async (req, res) => {
    try {
        let data = req.body;
        const id = req.params.id
        const detalleVenta = await detalleVentaService.filterById(id)
        if (!detalleVenta) {
            return res.status(400).json({ 'message': "Detalle de venta no encontrado" })
        }
        await detalleVentaService.update(id, data)
        res.status(200).send('se modifico el registro correctamente')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}
exports.deleteDetalleVenta = async (req, res) => {
    try {
        const id = req.params.id
        const detalleVenta = await detalleVentaService.filterById(id)
        if (!detalleVenta) {
            return res.status(400).json({ 'message': "Detalle de venta no encontrado" })
        }
        await detalleVentaService.delete(id)
        res.status(200).send('Se elimino el detalle de venta registrado')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}