/*
    Productos
    ruta: '/api/pedidos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPedido,
    getPedidoById,
    actualizarPedido,
    crearPedido
} = require('../controllers/pedidos');

const router = Router();

router.get('/', validarJWT, getPedido);

router.get('/:id', validarJWT, getPedidoById);

router.post('/', validarJWT, crearPedido);

router.put('/:id',
    [
        validarJWT,
        check('estado', 'El estado es necesario').not().isEmpty(),
        validarCampos
    ], actualizarPedido);

module.exports = router;
