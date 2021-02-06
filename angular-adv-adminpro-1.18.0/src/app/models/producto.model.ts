export class TipoProducto{
    constructor(
        public nombre:string,
        public caracteristicas:string
    ){}
}
export class Producto {

    constructor(
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public imagen: string,
        public tipoProducto: TipoProducto
    ) {}

}

