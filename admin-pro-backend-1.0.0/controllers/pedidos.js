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
const getPedidoTemp = async (req, res) => {
    const uid = req.params.id;

    try {
        const pedido = await Pedido.findOne({ usuario: uid, estado: 'temporal' })

        res.json({
            ok: true,
            pedido
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getPedidos = async (req, res) => {
    const uid = req.params.id;

    try {
        const pedidos = await Pedido.find({ usuario: uid, estado: { $ne: 'temporal' } })

        res.json({
            ok: true,
            pedidos,
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getPedidosFiltroPrecio = async (req, res) => {
    const uid = req.params.id;

    try {
        const pedidos = await Pedido.find({ usuario: uid, estado: { $ne: 'temporal' } }).sort({ precio: 1 })

        res.json({
            ok: true,
            pedidos,
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getTodosLosPedidos = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    const estado = req.query.estado || "Cualquier estado";
    const sort = req.query.sort;

    try {

        if (estado === 'Cualquier estado') {
            //Si no hay filtro por estado
            const [pedidos, total] = await Promise.all([
                Pedido
                    .find({ estado: { $nin: ['entregado', 'temporal'] } })
                    .populate('usuario','email')
                    .sort({ fecha: sort })
                    .skip(desde)
                    .limit(10),

                Pedido.countDocuments({ estado: { $nin: ['entregado', 'temporal'] } })
            ]);

            res.json({
                ok: true,
                pedidos,
                total
            })
        } else {
            //Si hay filtro por estado
            const [pedidos, total] = await Promise.all([
                Pedido
                    .find({ estado: estado })
                    .populate('usuario','email')
                    .sort({ fecha: sort })
                    .skip(desde)
                    .limit(10),

                Pedido.countDocuments({ estado: estado })
            ]);

            res.json({
                ok: true,
                pedidos,
                total
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const actualizarPedido = async (req, res) => {
    const id = req.params.id;

    try {
        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado por id',
            });
        }

        const cambiosPedido = {
            ...req.body,
        }

        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, cambiosPedido, { new: true });


        res.json({
            ok: true,
            pedido: pedidoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}
const eliminarPedido = async (req, res) => {

    const id = req.params.id;

    try {
        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({
                ok: true,
                msg: 'Pedido no encontrado por id',
            });
        }

        await Pedido.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Pedido borrado'
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
    crearPedido,
    getPedidoTemp,
    getTodosLosPedidos,
    getPedidosFiltroPrecio,
    getPedidos,
    eliminarPedido,
    actualizarPedido
}