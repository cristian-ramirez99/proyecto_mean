import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class TipoProducto {
    constructor(
        public nombre: string,
        public caracteristicas: string
    ) { }
}
export class Producto {

    constructor(
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public img: string,
        public tipoProducto: TipoProducto
    ) { }
    get imagenUrl() {
        return `${base_url}/upload/usuarios/no-image`;

    }
}

