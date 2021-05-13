const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
    //'temporal' | 'enviado' | 'proceso' | 'entregado' | 'cancelado'
    estado: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    fecha: {
        type: Date,
    },
    precio: {
        type: Number,
    },
    //'Contrarrembolso' | 'tarjeta' 
    formaPago:{
        type: String,
    }
});


PedidoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Pedido', PedidoSchema);
