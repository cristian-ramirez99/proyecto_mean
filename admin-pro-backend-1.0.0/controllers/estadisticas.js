const { response } = require('express');

const LineaPedido = require('../models/lineaPedido');

const getEstadisticasProductos = async (req, res) => {
    try {

        const lineaPedidos = await LineaPedido.find()
            .populate('producto', 'nombre precio tipoProducto')
            .populate('pedido','estado')

        res.json({
            ok: true,
            lineaPedidos,
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    getEstadisticasProductos
}
