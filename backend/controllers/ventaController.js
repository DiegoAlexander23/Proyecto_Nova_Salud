const VentaService = require('../services/ventaService')
const ventaService = new VentaService()

exports.getAllVentas = async (req, res) => {
    try {
        const ventas = await ventaService.getAllventas();
        res.status(200).json(Array.isArray(ventas) ? ventas : []);
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json([]); 
    }
}

exports.getVenta = async (req, res) => {
    const id = req.params.id
    const venta = await ventaService.filterById(id)
    if (!venta) {
        return res.status(400).json({ 'message': "venta no encontrada" })
    }
    res.status(200).json(venta)
}

exports.createVenta = async (req, res) => {
    try {
        const data = req.body
        console.log("Venta recibida:", data)
        const venta = await ventaService.create(data)
        res.status(201).json(venta)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}
exports.updateVenta = async (req, res) => {
    try {
        let data = req.body;
        const id = req.params.id
        const venta = await ventaService.filterById(id)
        if (!venta) {
            return res.status(400).json({ 'message': "Venta no encontrada" })
        }
        await ventaService.update(id, data)
        res.status(200).send('se modifico el registro correctamente')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}
exports.deleteVenta = async (req, res) => {
    try {
        const id = req.params.id
        const venta = await ventaService.filterById(id)
        if (!venta) {
            return res.status(400).json({ 'message': "Venta no encontrada" })
        }
        await ventaService.delete(id)
        res.status(200).send('Se elimino la venta registrada')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}