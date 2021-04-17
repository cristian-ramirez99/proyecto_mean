
export class Pedido {
    constructor(
        public estado: 'temporal' | 'enviado' | 'proceso' | 'entregado' | 'cancelado',
        public usuario: string,
        public fecha?: Date,
        public _id?: string,
        public precio?: number,
        public formaPago?: 'Contrarrembolso' | 'tarjeta' ,
    ) { }
    get auxDia() {
        return this.fecha.getDate() < 10 ? '0' : '';
    }
    get auxMes() {
        return this.fecha.getMonth() < 10 ? '0' : '';
    }
}

