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
const getProductosFiltrarStock = async (req, res = response) => {
    const productos = await Producto.find().sort({ stock: 1 })
        .populate('tipoProducto', 'nombre caracteristicas')


    res.json({
        ok: true,
        productos,
    });
}
const getProductos = async (req, res = response) => {

    const productos = await Producto.find().sort({ nombre: 1 })
        .populate('tipoProducto', 'nombre caracteristicas')


    res.json({
        ok: true,
        productos,
    });
}

const getProductosFiltrarPrecio = async (req, res) => {
    const productos = await Producto.find().sort({ precio: 1 })
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

const reabastecerStockAutomatico = async (req, res) => {
    const id = req.params.id;

    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const minStock = req.body.minStock;

        if (producto.stockDisponible == null) {
            producto.stockDisponible = 0;
        }

        //Hacer pedido para actualizar stock
        if (producto.stockDisponible + producto.stock <= minStock) {
            const nuevoStock = 50;

            //Actualizar stock disponible
            const actualizarStockDisponible = await Producto.updateOne({ _id: id }, { $set: { "stockDisponible": nuevoStock } });

            //1 dia en ms 
            await sleep(86400000);

            //Stock recibido en la entrega + stockActual
            const productoActualizado = await Producto.updateOne(
                { _id: id },
                {
                    $inc: { "stock": nuevoStock },
                    $set: { "stockDisponible": 0 }
                })


            res.json({
                ok: true,
            })
        } else {
            res.json({
                ok: false,
                msg: 'Ya hay stock suficiente'
            })
        }
    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    getProductos,
    getProductosFiltrarPrecio,
    getProductosFiltrarStock,
    crearProducto,
    getProductoById,
    eliminarProducto,
    actualizarProducto,
    reabastecerStockAutomatico
}
