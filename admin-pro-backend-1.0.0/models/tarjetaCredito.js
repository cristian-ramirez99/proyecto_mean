const { Schema, model } = require('mongoose');

const TarjetaCreditoSchema = Schema({
    //public tipo: 'VISA' | 'MASTERCARD',
    tipo:{
        type: String,
        Required: true
    },
    titular: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    fechaCaducidad: {
        type: Date,
        required: true
    },
    cvv: {
        type: String,
        required: true
    }
});


TarjetaCreditoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('TarjetaCredito', TarjetaCreditoSchema);