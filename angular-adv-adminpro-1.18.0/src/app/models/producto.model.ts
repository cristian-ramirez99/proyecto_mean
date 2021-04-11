import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class TipoProducto {
    constructor(
        public nombre: string,
        public caracteristicas: string,
        public _id?,
    ) { }
}
export class Producto {

    constructor(
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public img: string,
        public tipoProducto: TipoProducto,
        public _id?: string,
        public stock?: number

    ) { }
    get imagenUrl() {
        if (!this.img) {
            return `${base_url}/upload/usuarios/no-image`;
        } else if (this.img) {
            return `${base_url}/upload/producto/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }

    }
}

