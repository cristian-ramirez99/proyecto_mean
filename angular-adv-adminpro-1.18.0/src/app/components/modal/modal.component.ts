import { Component } from '@angular/core';
import { LineaPedido } from 'src/app/models/lineaPedido.model';
import { Pedido } from 'src/app/models/pedido.mode';
import { LineaPedidoService } from 'src/app/services/linea-pedido.service';
import { ModalService } from '../../services/modal.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService,
    private lineaPedidoService: LineaPedidoService) { }

  public pedido: Pedido = new Pedido('cancelado', '', new Date(), '');
  public lineaPedidos: LineaPedido[] = [];
  public primeraVez: boolean = true;
  public toggle: boolean[] = [true, false, false, false];

  onInitModal() {
    if (this.primeraVez) {
      console.log("onInitModal");

      this.primeraVez = false;
      //Obtenemos el pedido clickado
      this.pedido = this.modalService.pedido;
      this.cargarLineaPedido();
    }
  }
  cargarLineaPedido() {
    this.lineaPedidoService.cargarLineaPedidos(this.pedido._id)
      .subscribe((lineaPedidos: LineaPedido[]) => {
        this.lineaPedidos = lineaPedidos;
        console.log(this.lineaPedidos);
      })
  }
  cerrarModal() {
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalService.cerrarModal();
  }
}
