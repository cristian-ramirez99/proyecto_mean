const { Schema, model } = require('mongoose');

const ProductosSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },
    tipoProducto: {
        type: Schema.Types.ObjectId,
        ref: 'TipoProducto',
        required: true
    },
    stock: {
        type: Number
    }

});


ProductosSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Producto', ProductosSchema);
