const UserService = require('../services/userService')
const userService = new UserService

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(Array.isArray(users) ? users : []);
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json([]); 
    }
}

exports.getUser = async (req, res) => {
    const id = req.params.id
    const user = await userService.filterById(id)
    if (!user) {
        return res.status(400).json({ 'message': "usuario no encontrado" })
    }
    res.status(200).json(user)
}

exports.createUser = async (req, res) => {
    try {
        let data = req.body; 
        
        console.log("Datos recibidos en el servidor:", data);

        await userService.create(data);
        res.status(201).send("Usuario Registrado");
    } catch (error) {
        console.error("ERROR AL CREAR:", error.message);
        res.status(500).json({ "error": error.message });
    }
}
exports.updateUser = async (req, res) => {
    try {
        let data = req.body;
        const id = req.params.id
        const user = await userService.filterById(id)
        if (!user) {
            return res.status(400).json({ 'message': "Usuario no encontrado" })
        }
        await userService.update(id, data)
        res.status(200).send('se modifico el registro correctamente')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userService.filterById(id)
        if (!user) {
            return res.status(400).json({ 'message': "Usuario no encontrado" })
        }
        await userService.delete(id)
        res.status(200).send('Se elimino el usuario registrado')
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}