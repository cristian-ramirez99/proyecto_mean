const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
    estado: {
        type: String,
        required: true
    },
    lineaPedido: [{
        type: Schema.Types.ObjectId,
        ref: 'LineaPedido',
        required: true
    }],
    fecha: {
        type: Number,
    },
    precio: {
        type: Number,
    },
});


PedidoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Pedido', PedidoSchema);
