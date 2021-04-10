const { response } = require('express');

const Pedido = require('../models/pedido');

const crearPedido = async (req, res) => {

    const pedido = new Pedido({
        ...req.body
    });


    try {

        const pedidoDB = await pedido.save();


        res.json({
            ok: true,
            pedido: pedidoDB
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
    crearPedido
}