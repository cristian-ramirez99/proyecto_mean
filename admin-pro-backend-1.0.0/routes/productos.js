/*
    Productos
    ruta: '/api/productos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
    getProductoById,
    eliminarProducto,
    actualizarProducto,
    getProductosFiltrarPrecio
} = require('../controllers/productos');

const router = Router();

router.get('/', validarJWT, getProductos);

router.get('/filtroPrecio',validarJWT,getProductosFiltrarPrecio);

router.get('/:id', validarJWT, getProductoById);


router.post('/',
    [
        validarJWT,
        check('nombre', "El nombre del producto es necesario").not().isEmpty(),
        check('descripcion', "La descripcion del producto es necesaria").not().isEmpty(),
        check('precio', "El precio del producto es necesario").not().isEmpty(),
        check('tipoProducto', 'El tipoProducto id debe de ser válido').isMongoId(),
        validarCampos,
    ]
    , crearProducto);

router.put('/:id',validarJWT,actualizarProducto);

router.delete('/:id', validarJWT, eliminarProducto);

module.exports = router;
