const { response, json } = require('express');

const Direccion = require('../models/direccion');

const getDireccionById = async (req, res) => {

    const id = req.params.id;

    try {
        const direccion = await Direccion.findById(id);

        res.json({
            ok: true,
            direccion
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

/*const getEnvio = async (req, res) => {

    const envio = await Envio.find({})

    res.json({
        ok: true,
        envio,
    });
} */
const crearDireccion = async (req, res = response) => {

    const direccion = new Direccion({
        ...req.body
    });


    try {

        const direccionDB = await direccion.save();


        res.json({
            ok: true,
            direccion: direccionDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarDireccion = async (req, res) => {
    const id = req.params.id;

    try {
        const direccion = await Direccion.findById(id);

        if (!direccion) {
            return res.status(404).json({
                ok: true,
                msg: 'Direccion de envio no encontrada por id',
            });
        }


        await Direccion.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Dirección de envio borrada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarDireccion = async (req, res = response) => {
    const id = req.params.id;

    try {

        const direccion = await Direccion.findById(id);

        if (!direccion) {
            return res.status(404).json({
                ok: true,
                msg: 'Direccion de envio no encontrada por id',
            });
        }

        const cambiosDireccion = {
            ...req.body,
        }

        const direccionActualizada = await Direccion.findByIdAndUpdate(id, cambiosDireccion, { new: true });


        res.json({
            ok: true,
            direccion: direccionActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getDireccionById,
    crearDireccion,
    eliminarDireccion,
    actualizarDireccion
}