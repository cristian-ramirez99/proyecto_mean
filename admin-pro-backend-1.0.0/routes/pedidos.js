/*
    Productos
    ruta: '/api/pedidos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearPedido
} = require('../controllers/pedidos');

const router = Router();


router.post('/',     [
    validarJWT,
    check('estado','El estado es necesario').not().isEmpty(),
    validarCampos
],crearPedido);

module.exports = router;
