import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public cargando: boolean = true;
  public desde: number = 0;

  constructor(private modalService: ModalService) { }
  ngOnInit(): void {
    this.cargando = false;
  }
  abirModal(id_pedido: string) {
    console.log("Abriendo modal");
    this.modalService.abrirModal(id_pedido);
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    console.log(valor);
    //this.PedidosService.cargarPedidos(valor);
  }
}
