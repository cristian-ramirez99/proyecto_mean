/*
    Productos
    ruta: '/api/producto'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
} = require('../controllers/productos');

const router = Router();

router.get('/', validarJWT, getProductos);

router.post('/',
[ 
    validarJWT,
    check('nombre',"El nombre del producto es necesario").not().isEmpty(),
    check('descripcion',"La descripcion del producto es necesaria").not().isEmpty(),
    check('precio',"El precio del producto es necesario").not().isEmpty(),
    validarCampos,
]
, crearProducto);

module.exports = router;
