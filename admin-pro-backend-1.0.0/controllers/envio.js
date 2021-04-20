const { response, json } = require('express');

const Envio = require('../models/envio');

const getEnvioById = async (req, res) => {

    const id = req.params.id;

    try {
        const envio = await Envio.findById(id);

        res.json({
            ok: true,
            envio
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getEnvio = async (req, res) => {

    const envio = await Envio.find({})

    res.json({
        ok: true,
        envio,
    });
}
const crearEnvio = async (req, res = response) => {

    const envio = new Envio({
        ...req.body
    });


    try {

        const envioDB = await envio.save();


        res.json({
            ok: true,
            envio: envioDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarEnvio = async (req, res) => {
    const id = req.params.id;

    try {
        const envio = await Envio.findById(id);

        if (!envio) {
            return res.status(404).json({
                ok: true,
                msg: 'Direccion de envio no encontrada por id',
            });
        }


        await Envio.findByIdAndDelete(id);

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
const actualizarEnvio = async (req, res = response) => {
    const id = req.params.id;

    try {

        const envio = await Envio.findById(id);

        if (!envio) {
            return res.status(404).json({
                ok: true,
                msg: 'Direccion de envio no encontrada por id',
            });
        }

        const cambiosEnvio = {
            ...req.body,
        }

        const envioActualizado = await Envio.findByIdAndUpdate(id, cambiosEnvio, { new: true });


        res.json({
            ok: true,
            envio: envioActualizado
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
    getEnvioById,
    getEnvio,
    crearEnvio,
    eliminarEnvio,
    actualizarEnvio
}