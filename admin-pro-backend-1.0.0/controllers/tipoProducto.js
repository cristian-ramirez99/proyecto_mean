const { response, json } = require('express');

const TipoProducto = require('../models/tipoProducto');

const getTipoProductoById = async (req, res) => {

    const id = req.params.id;

    try {
        const tipoProducto = await TipoProducto.findById(id);

        res.json({
            ok: true,
            tipoProducto
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getTipoProductos = async (req, res) => {

    const tipoProductos = await TipoProducto.find({})

    res.json({
        ok: true,
        tipoProductos,
    });
}
const crearTipoProducto = async (req, res = response) => {

    const tipoProducto = new TipoProducto({
        ...req.body
    });


    try {

        const tipoProductoDB = await tipoProducto.save();


        res.json({
            ok: true,
            tipoProducto: tipoProductoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarTipoProducto = async (req, res) => {
    const id = req.params.id;


    try {
        const tipoProducto = await TipoProducto.findById(id);

        if (!tipoProducto) {
            return res.status(404).json({
                ok: true,
                msg: 'Tipo producto no encontrado por id',
            });
        }


        await TipoProducto.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Tipo producto borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarTipoProducto = async (req, res = response) => {
    const id = req.params.id;

    try {

        const tipoProducto = await TipoProducto.findById(id);

        if (!tipoProducto) {
            return res.status(404).json({
                ok: true,
                msg: 'Tipo producto no encontrado por id',
            });
        }

        const cambiosTipoProducto = {
            ...req.body,
        }

        const tipoProductoActualizado = await TipoProducto.findByIdAndUpdate(id, cambiosTipoProducto, { new: true });


        res.json({
            ok: true,
            tipoProducto: tipoProductoActualizado
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
    getTipoProductos,
    getTipoProductoById,
    crearTipoProducto,
    eliminarTipoProducto,
    actualizarTipoProducto
}