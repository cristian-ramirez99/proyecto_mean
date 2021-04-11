import { Pedido } from "./pedido.mode";
import { Producto } from "./producto.model";

export class LineaPedido {
    constructor(
        public cantidad: number,
        public producto: Producto,
        public pedido: Pedido,
        public _id?: string,
    ) { }

}

