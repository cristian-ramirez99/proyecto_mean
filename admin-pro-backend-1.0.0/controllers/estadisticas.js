const { response } = require('express');

const LineaPedido = require('../models/lineaPedido');

const getEstadisticasProductos = async (req, res) => {
    try {

        const lineaPedidos = await LineaPedido.find()
            .populate('pedido', 'estado')
            .populate('producto', 'nombre precio')

        const arrayLineaPedidos = [];
        for (var i in lineaPedidos) {
            arrayLineaPedidos.push([i, lineaPedidos[i]]);
        }


        for (let i = 0; lineaPedidos.length > i; i++) {
            const cantidad = arrayLineaPedidos[i].cantidad;
            const precio = arrayLineaPedidos[i].producto.nombre;
            
        }


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
