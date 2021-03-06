/*
    Estadisticas
    ruta: '/api/estadisticas'
*/
const { Router } = require('express');

const { validarJWT, varlidarADMIN_ROLE } = require('../middlewares/validar-jwt');

const {  getEstadisticasProductos } = require('../controllers/estadisticas')

const router = Router();

router.get('/',
    [
        validarJWT,
        varlidarADMIN_ROLE
    ],
    getEstadisticasProductos);

module.exports = router;



