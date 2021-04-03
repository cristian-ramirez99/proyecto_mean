import { Component, OnInit } from '@angular/core';
import { TarjetaCreditoService } from '../../services/tarjeta-credito.service';
import { ModalTarjetaCreditoService } from '../../services/modal-tarjeta-credito.service';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito.model';

@Component({
  selector: 'app-modal-tarjeta-credito',
  templateUrl: './modal-tarjeta-credito.component.html',
  styleUrls: ['./modal-tarjeta-credito.component.css']
})
export class ModalTarjetaCreditoComponent implements OnInit {

  public primeraVez: boolean = true;
  public tarjetaCredito: TarjetaCredito;

  constructor(public modalTarjetaCreditoService: ModalTarjetaCreditoService,
    private tarjetaCreditoService: TarjetaCreditoService) { }

  ngOnInit(): void {
    if (this.primeraVez) {
      this.primeraVez = false;
      this.cargarTarjetaCredito();
    }
  }

  cargarTarjetaCredito() {
    this.tarjetaCreditoService.cargarTarjetaCredito()
      .subscribe(tarjeta => {
        this.tarjetaCredito = tarjeta;
      });
    //Borrar !!!
    this.tarjetaCredito = new TarjetaCredito('VISA', "El pana manuel", "1234567891234567", new Date(), "123", "e1g2h12fgvd");
  }
  hacerPedido() {
    console.log("Aser pedido");
  }
  cerrarModal() {
    if (!this.primeraVez) {
      this.primeraVez = true;
    }
    this.modalTarjetaCreditoService.cerrarModal();
  }
  


}
