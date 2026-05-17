const ProductoService = require('../services/productoService')
const productoService = new ProductoService

exports.getAllProductos = async (req, res) => {
    try {
        const Productos = await productoService.getAllProductos();
        res.status(200).json(Array.isArray(Productos) ? Productos : []);
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json([]); 
    }
}

exports.getProducto = async (req, res) => {
    const id = req.params.id
    const producto = await productoService.filterById(id)
    if (!producto) {
        return res.status(400).json({ 'message': "Producto no encontrado" })
    }
    res.status(200).json(producto)
}

exports.createProducto = async (req, res) => {
    try {
        let data = req.body; 
        
        console.log("Datos recibidos en el servidor:", data);

        await productoService.create(data);
        res.status(201).send("Producto Registrado");
    } catch (error) {
        console.error("ERROR AL CREAR:", error.message);
        res.status(500).json({ "error": error.message });
    }
}
exports.updateProducto = async (req, res) => {
    try {
        let data = req.body;
        const id = req.params.id
        const producto = await productoService.filterById(id)
        if (!producto) {
            return res.status(400).json({ 'message': "Producto no encontrado" })
        }
        await productoService.update(id, data)
        res.status(200).send('se modifico el registro correctamente')
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}
exports.deleteProducto = async (req, res) => {
    try {
        const id = req.params.id
        const producto = await productoService.filterById(id)
        if (!producto) {
            return res.status(400).json({ 'message': "Producto no encontrado" })
        }
        await productoService.delete(id)
        res.status(200).send('Se elimino el Producto registrado')
    } catch (error) {
        res.status(500).json({ "error": error.message })
        console.log(error)
    }
}