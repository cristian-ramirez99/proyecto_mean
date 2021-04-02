export class Direccion {
    constructor(
        public nombre: string,
        public calle: string,
        public numeroCalle: string,
        public cp: string,
        public localidad: string,
        public telefono: string,
        public datosAdicionales: string,
        public _id?: string
    ) { }
}

