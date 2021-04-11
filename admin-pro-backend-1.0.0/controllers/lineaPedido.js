const { response } = require('express');

const LineaPedido = require('../models/lineaPedido');

const getLineaPedidosByIdPedido = async (req, res) => {

    const id = req.params.id;

    try {
        //Falta tipoProducto por algun lado
        const lineaPedido = await LineaPedido.find({ 'pedido': id })
            .populate('producto', 'nombre descripcion precio img stock')
            .populate('pedido', 'precio fecha');

        res.json({
            ok: true,
            lineaPedido,
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const crearLineaPedido = async (req, res) => {

    const lineaPedido = new LineaPedido({
        ...req.body
    });

    try {

        const lineaPedidoDB = await lineaPedido.save();


        res.json({
            ok: true,
            LineaPedido: lineaPedidoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarLineaPedido = async (req, res) => {
    const id = req.params.id;

    try {
        const lineaPedido = await LineaPedido.findById(id);

        if (!lineaPedido) {
            return res.status(404).json({
                ok: true,
                msg: 'Linea pedido no encontrado por id',
            });
        }

        await LineaPedido.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Linea pedido borrado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getLineaPedidosByIdPedido,
    crearLineaPedido,
    eliminarLineaPedido
}