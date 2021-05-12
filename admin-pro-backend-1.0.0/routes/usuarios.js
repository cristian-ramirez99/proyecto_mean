/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario, actualizarPassword, actualizarEmail, getUsuariosFiltroNombre, getTodosLosUsuarios } = require('../controllers/usuarios');
const {
    validarJWT,
    varlidarADMIN_ROLE,
    varlidarADMIN_ROLE_o_MismoUsuario
} = require('../middlewares/validar-jwt');


const router = Router();


router.get('/filtroNombre', validarJWT, getUsuariosFiltroNombre);

router.get('/', validarJWT, getUsuarios);

router.get('/todos', validarJWT, getTodosLosUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarEmail
);


router.put('/agregarCampo/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
    ],
    actualizarUsuario
);

router.put('/password/:id',
    [
        validarJWT,
        check('antiguaPassword', 'La antigua password es obligatoria').not().isEmpty(),
        check('nuevaPassword', 'La nueva password es obligatoria').not().isEmpty(),
        validarCampos,
    ], actualizarPassword)

router.delete('/:id',
    [validarJWT, varlidarADMIN_ROLE],
    borrarUsuario
);


module.exports = router;