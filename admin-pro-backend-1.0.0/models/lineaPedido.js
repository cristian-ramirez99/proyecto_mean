const { Schema, model } = require('mongoose');

const LineaPedidoSchema = Schema({

    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});


LineaPedidoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('LineaPedido', LineaPedidoSchema);
