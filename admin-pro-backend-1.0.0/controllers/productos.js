const { response } = require('express');

const Producto = require('../models/productos');

const getProductoById = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id)
            .populate('tipoProducto', 'nombre caracteristicas')

        res.json({
            ok: true,
            producto
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getProductos = async (req, res = response) => {

    const productos = await Producto.find()
        .populate('tipoProducto', 'nombre caracteristicas')


    res.json({
        ok: true,
        productos,
    });
}
const crearProducto = async (req, res) => {

    const producto = new Producto({
        ...req.body
    });

    try {
        const productoDB = await producto.save();


        res.json({
            ok: true,
            producto: productoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarProducto = async (req, res) => {
    const id = req.params.id;

    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        await Producto.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Producto borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarProducto = async (req, res) => {
    const id = req.params.id;

    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const cambiosProducto = {
            ...req.body,
        }

        const productoActualizado = await Producto.findByIdAndUpdate(id, cambiosProducto, { new: true });


        res.json({
            ok: true,
            producto: productoActualizado
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
    getProductos,
    crearProducto,
    getProductoById,
    eliminarProducto,
    actualizarProducto
}
