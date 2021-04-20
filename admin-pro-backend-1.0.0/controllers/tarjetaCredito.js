const { response, json } = require('express');

const TarjetaCredito = require('../models/tarjetaCredito');

const getTarjetaCreditoById = async (req, res) => {

    const id = req.params.id;

    try {
        const tarjetaCredito = await TarjetaCredito.findById(id);

        res.json({
            ok: true,
            tarjetaCredito
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getTarjetaCredito = async (req, res) => {

    const tarjetaCredito = await TarjetaCredito.find({})

    res.json({
        ok: true,
        tarjetaCredito,
    });
}
const crearTarjetaCredito = async (req, res = response) => {

    const tarjetaCredito = new TarjetaCredito({
        ...req.body
    });


    try {

        const tarjetaCreditoDB = await tarjetaCredito.save();


        res.json({
            ok: true,
            tarjetaCredito: tarjetaCreditoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarTarjetaCredito = async (req, res) => {
    const id = req.params.id;

    try {
        const tarjetaCredito = await TarjetaCredito.findById(id);

        if (!tarjetaCredito) {
            return res.status(404).json({
                ok: true,
                msg: 'Targeta de credito no encontrada por id',
            });
        }


        await TarjetaCredito.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Targeta de credito borrada'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarTarjetaCredito = async (req, res = response) => {
    const id = req.params.id;

    try {

        const tarjetaCredito = await TarjetaCredito.findById(id);

        if (!tarjetaCredito) {
            return res.status(404).json({
                ok: true,
                msg: 'Targeta de credito no encontrada por id',
            });
        }

        const cambiosTarjetaCredito = {
            ...req.body,
        }

        const tarjetaCreditoActualizado = await TarjetaCredito.findByIdAndUpdate(id, cambiosTarjetaCredito, { new: true });


        res.json({
            ok: true,
            tarjetaCredito: tarjetaCreditoActualizado
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
    getTarjetaCreditoById,
    getTarjetaCredito,
    crearTarjetaCredito,
    eliminarTarjetaCredito,
    actualizarTarjetaCredito
}