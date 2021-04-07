const { Schema, model } = require('mongoose');

const TipoProductoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    caracteristicas: {
        type: String,
        required: true
    }
});


TipoProductoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('TipoProducto', TipoProductoSchema);
