/*
    TipoProducto
    ruta: '/api/tipoProducto'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getTipoProductos,
    getTipoProductoById,
    crearTipoProducto,
    eliminarTipoProducto,
} = require('../controllers/tipoProducto');

const router = Router();

router.get('/', validarJWT, getTipoProductos);

router.get('/:id', validarJWT, getTipoProductoById);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del tipo producto es necesario').not().isEmpty(),
        check('caracteristicas', 'Las caracteristicas del tipo producto son necesarias').not().isEmpty(),
        validarCampos,
    ],
    crearTipoProducto);

router.delete('/:id', validarJWT, eliminarTipoProducto);

module.exports = router;
