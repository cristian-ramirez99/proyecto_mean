export class Direccion {
    constructor(
        public nombreDestinatario: string,
        public calle: string,
        public numeroPortal: string,
        public codigoPostal: string,
        public localidad: string,
        public telefono: string,
        public datosAdicionales: string,
        public _id?: string
    ) { }
}

