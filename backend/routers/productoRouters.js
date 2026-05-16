const express = require('express')
const router = express.Router()

const userController=require('../controllers/productoController')

router.get('/', userController.getAllProductos)
router.get('/:id', userController.getProducto)
router.post('/', userController.createProducto)
router.put('/:id', userController.updateProducto)
router.delete('/:id', userController.deleteProducto)

module.exports=router