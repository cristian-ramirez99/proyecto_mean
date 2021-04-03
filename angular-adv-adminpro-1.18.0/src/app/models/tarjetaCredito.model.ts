export class TarjetaCredito {
    constructor(
        public tipo: 'VISA' | 'MASTERCARD',
        public titular: string,
        public numero: string,
        public fechaCaducidad: Date,
        public cvv: string,
        public _id?: string
    ) { }
}

