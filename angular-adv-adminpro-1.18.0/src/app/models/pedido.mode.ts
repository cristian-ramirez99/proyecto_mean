import { Producto } from "./producto.model";

export class Pedido {
    constructor(
        public estado: 'temporal' | 'enviado' | 'proceso' | 'entregado' | 'cancelado',
        public productos: Producto[],
        public fecha?: Date,
        public _id?: string,
        public precio?: number,
    ) { }
    get auxDia() {
        return this.fecha.getDate() < 10 ? '0' : '';
    }
    get auxMes() {
        return this.fecha.getMonth() < 10 ? '0' : '';
    }
}

