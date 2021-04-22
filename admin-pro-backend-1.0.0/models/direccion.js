const { Schema, model } = require('mongoose');
const usuario = require('./usuario');

const DireccionSchema = Schema({
    nombreDestinatario:{
        type: String,
        Required: true
    },
    calle: {
        type: String,
        required: true
    },
    numeroPortal: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    datosAdicionales: {
        type: String,
    }
});


DireccionSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Direccion', DireccionSchema);