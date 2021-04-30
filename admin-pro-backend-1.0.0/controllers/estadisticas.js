const { response } = require('express');

const LineaPedido = require('../models/lineaPedido');

const getEstadisticasProductos = async (req, res) => {
    try {

        const lineaPedidos = await LineaPedido.find()
            .populate('producto')
            .populate({ path: 'pedido', estado: { $ne: 'temporal' } })
            .exec()

        const arrayLineaPedidos = [];

        var result = {};
        for (let i = 0; i < lineaPedidos.length; i++) {
            //Si lineaPedidos no esta en estado temporal
            if (lineaPedidos.pedido != null) {
                console.log(lineaPedidos[i].cantidad);
                console.log(lineaPedidos[i].producto);
                console.log(lineaPedidos[i].producto.nombre);
                //result[lineaPedidos[i]] = lineaPedidos[i].cantidad;
            }
        }

     /*   let estadisticasProductos = new Map();

        for (let i = 0; lineaPedidos.length > i; i++) {
            if (arrayLineaPedidos[i].cantidad != null && arrayLineaPedidos[i].producto.nombre != null) {
                const cantidad = arrayLineaPedidos[i].cantidad;
                const nombreProducto = arrayLineaPedidos[i].producto.nombre;
                console.log("Cantidad:" + cantidad);
                console.log(nombreProducto);

                if (estadisticasProductos.size == 0) {
                    estadisticasProductos.set(nombreProducto, cantidad);
                }
            }
        } */

        const estadisticas = mapToObj(estadisticasProductos);
        const bobo = { "x": 2 };

        res.json({
            ok: true,
            bobo,
        });

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function (value, key) {
        obj[key] = value
    });

    return JSON.stringify(obj);
}


module.exports = {
    getEstadisticasProductos
}
