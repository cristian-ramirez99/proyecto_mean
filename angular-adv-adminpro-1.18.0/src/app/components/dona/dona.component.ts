import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { LineaPedido } from 'src/app/models/lineaPedido.model';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  lineaPedidos: LineaPedido[] = [];
  cantidad: number[] = [];
  precio: number[] = [];

  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = [];
  @Input('data') doughnutChartData: MultiDataSet = [];


  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#17202A', '#6E2C00', '#186A3B ', '#4A235A ', '#78281F ','#154360','#AEB6BF','#ABEBC6 '] }
  ];

}
