import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.mode';
import { ModalService } from '../../services/modal.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(public modalService: ModalService,
    public pedidoService: PedidoService) { }

  public pedido: Pedido;
  public primeraVez: boolean = true;
  public mouseOnRow: boolean = false;
  ngOnInit(): void {
  }

  onInitModal() {
    if (this.primeraVez) {
      console.log("onInitModal");

      this.primeraVez = false;
      //Obtenemos el pedido clickado
      this.pedido = this.modalService.pedido;
    }
  }
  cerrarModal() {
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalService.cerrarModal();
  }
  changeRowColour() {
    this.mouseOnRow = !this.mouseOnRow;
  }


}