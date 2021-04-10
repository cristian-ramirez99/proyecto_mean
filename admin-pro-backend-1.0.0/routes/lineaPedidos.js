/*
    Productos
    ruta: '/api/lineaPedidos'
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getLineaPedidosByIdPedido,
    crearLineaPedido
} = require('../controllers/lineaPedido');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/:id', validarJWT, getLineaPedidosByIdPedido);

router.post('/', [
    validarJWT,
    check('cantidad', 'La cantidad es necesaria').not().isEmpty(),
    check('producto', 'El producto id debe de ser válido').isMongoId(),
    check('pedido', 'El pedido id debe de ser válido').isMongoId(),
    validarCampos
], crearLineaPedido);

module.exports = router;
