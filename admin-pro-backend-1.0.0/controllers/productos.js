const { response} = require('express');

const Producto = require('../models/productos');

const getProductos = async (req, res=response) => {

    const productos = await Producto.find()
                                .populate('tipoProducto','nombre caracteristicas')
                                

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

module.exports = {
    getProductos,
    crearProducto
}
