/*
    TarjetaCredito
    ruta: '/api/tarjetaCredito'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getTarjetaCreditoById,
    getTarjetaCredito,
    crearTarjetaCredito,
    eliminarTarjetaCredito,
    actualizarTarjetaCredito
} = require('../controllers/tarjetaCredito');

const router = Router();

router.get('/', validarJWT, getTarjetaCredito);

router.get('/:id', validarJWT, getTarjetaCreditoById);

router.post('/',
    [
        validarJWT,
        check('tipo', 'El tipo de la tarjeta de credito es necesario').not().isEmpty(),
        check('titular', 'El nombre del titular de la tarjeta de credito es necesario').not().isEmpty(),
        check('numero', 'El numero de la tarjeta de credito es necesario').not().isEmpty(),
        check('fechaCaducidad', 'La fecha de caducidad de la tarjeta de credito es necesario').not().isEmpty(),
        check('cvv', 'El cvv de la tarjeta de credito es necesario').not().isEmpty(),
        validarCampos,
    ],
    crearTarjetaCredito);

router.put('/:id',
    [
        validarJWT,
        check('tipo', 'El tipo de la tarjeta de credito es necesario').not().isEmpty(),
        check('titular', 'El nombre del titular de la tarjeta de credito es necesario').not().isEmpty(),
        check('numero', 'El numero de la tarjeta de credito es necesario').not().isEmpty(),
        check('fechaCaducidad', 'La fecha de caducidad de la tarjeta de credito es necesario').not().isEmpty(),
        check('cvv', 'El cvv de la tarjeta de credito es necesario').not().isEmpty(),
        validarCampos,
    ],
    actualizarTarjetaCredito);

router.delete('/:id', validarJWT, eliminarTarjetaCredito);

module.exports = router;