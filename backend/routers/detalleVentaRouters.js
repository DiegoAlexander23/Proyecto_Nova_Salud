const express = require('express')
const router = express.Router()

const detalleVentaController=require('../controllers/detalleVentaController')

router.get('/', detalleVentaController.getAllDetalleVentas)
router.get('/:id', detalleVentaController.getDetalleVenta)
router.post('/', detalleVentaController.createDetalleVenta)
router.put('/:id', detalleVentaController.updateDetalleVenta)
router.delete('/:id', detalleVentaController.deleteDetalleVenta)

module.exports=router