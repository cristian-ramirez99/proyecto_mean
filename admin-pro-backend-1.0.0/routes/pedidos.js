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
    eliminarPedido,
    actualizarPedido,
    getPedidosFiltroPrecio
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

router.get('/filtroPrecio/:id', validarJWT, getPedidosFiltroPrecio);


router.delete('/:id', validarJWT, eliminarPedido);

router.put('/:id',
    [
        validarJWT,
        check('estado', 'El estado es necesario').not().isEmpty(),
        check('usuario', 'El usuario id debe de ser válido').isMongoId(),
        check('precio', 'El precio es necesario').not().isEmpty(),
        check('fecha', 'La fecha es necesaria').not().isEmpty(),
        validarCampos
    ]
    , actualizarPedido);
module.exports = router;
