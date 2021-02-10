import { Producto } from "./producto.model";

export class Pedido {
    constructor(
        public fecha: Date,
        public estado: 'enviado' | 'proceso' | 'entregado' | 'cancelado',
        public productos: Producto[],
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

