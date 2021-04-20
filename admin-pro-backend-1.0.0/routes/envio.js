/*
    TarjetaCredito
    ruta: '/api/tarjetaCredito'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getEnvioById,
    getEnvio,
    crearEnvio,
    eliminarEnvio,
    actualizarEnvio
} = require('../controllers/envio');

const router = Router();

router.get('/', validarJWT, getEnvio);

router.get('/:id', validarJWT, getEnvioById);

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
    crearEnvio);

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
    actualizarEnvio);

router.delete('/:id', validarJWT, eliminarEnvio);

module.exports = router;