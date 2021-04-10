/*
    Productos
    ruta: '/api/pedidos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearPedido,
    getPedidoTemp,
    getPedidos,
    eliminarPedido
} = require('../controllers/pedidos');

const router = Router();

router.post('/',
    [
        validarJWT,
        check('estado', 'El estado es necesario').not().isEmpty(),
        check('usuario', 'El usuario id debe de ser válido').isMongoId(),
        validarCampos
    ], crearPedido);

router.get('/temp/:id', validarJWT, getPedidoTemp);

router.get('/:id', validarJWT, getPedidos);

router.delete('/:id', validarJWT, eliminarPedido);

module.exports = router;
