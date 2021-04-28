/*
    Medicos
    ruta: '/api/estadisticas'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT, varlidarADMIN_ROLE } = require('../middlewares/validar-jwt');

const { getEstadisticasTipoProducto, getEstadisticasProductos } = require('../controllers/estadisticas')

const router = Router();

router.get('/',
    [
        validarJWT,
        varlidarADMIN_ROLE
    ],
    getEstadisticasProductos);

module.exports = router;



