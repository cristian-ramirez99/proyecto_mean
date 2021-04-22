/*
    Direccion
    ruta: '/api/direccion'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDireccionById,
    crearDireccion,
    eliminarDireccion,
    actualizarDireccion
} = require('../controllers/direccion');

const router = Router();

router.get('/:id', validarJWT, getDireccionById);

router.post('/',
    [
        validarJWT,
        check('nombreDestinatario', 'El nombre del destinatario es necesario').not().isEmpty(),
        check('calle', 'El nombre de la calle es necesario').not().isEmpty(),
        check('numeroPortal', 'El numero del portal es necesario').not().isEmpty(),
        check('codigoPostal', 'El codigo postal es necesario').not().isEmpty(),
        check('localidad', 'La localidad es necesaria').not().isEmpty(),
        check('telefono', 'El telefono es necesario').not().isEmpty(),
        validarCampos,
    ],
    crearDireccion);

router.put('/:id',
    [
        validarJWT,
        check('nombreDestinatario', 'El nombre del destinatario es necesario').not().isEmpty(),
        check('calle', 'El nombre de la calle es necesario').not().isEmpty(),
        check('numeroPortal', 'El numero del portal es necesario').not().isEmpty(),
        check('codigoPostal', 'El codigo postal es necesario').not().isEmpty(),
        check('localidad', 'La localidad es necesaria').not().isEmpty(),
        check('telefono', 'El telefono es necesario').not().isEmpty(),
        validarCampos,
    ],
    actualizarDireccion);

router.delete('/:id', validarJWT, eliminarDireccion);

module.exports = router;