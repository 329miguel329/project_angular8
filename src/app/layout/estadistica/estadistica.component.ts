import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
  animations: [routerTransition()]
})
export class EstadisticaComponent implements OnInit {
  // bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels: string[] = ['Desempeño', 'Eficiencia', 'Participación y progreso'];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
    { data: [56, 55, 40], label: 'Series A' }
  ];

  // Pie
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string;

  // lineChart
  public graficosEficiencia: Array<any> = [
    { name: 'Uso interactivo del ingles' },
    { name: 'Conocimiento lexical' },
    { name: 'Conocimiento comunicativo' },
    { name: 'Conocimiento gramatical' },
    { name: 'Lectura literal' },
    { name: 'Lectura inferencial' },
    { name: 'Conocimiento gramatical y lexical' },
  ];

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56], label: 'Series A', fill: false, lineTension: 0 },
    { data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86], label: 'Series B', fill: false, lineTension: 0 },
    { data: [18, 48, 77, 9, 100, 27, 40, 77, 9, 100], label: 'Series C', fill: false, lineTension: 0 }
  ];
  public lineChartLabels: Array<any> = ['M01', 'M02', 'M01', 'M03', 'M01', 'M02', 'M04', 'M01', 'M02', 'M04'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
  ];
  public lineChartLegend: boolean;
  public lineChartType: string;

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  public randomize(): void {
    // Only; Change; 3; values;
    const data = [Math.round(Math.random() * 100), 59, 80, Math.random() * 100, 56, Math.random() * 100, 40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  constructor (private route: ActivatedRoute) {
    console.log(this.route.snapshot.params);
  }

  ngOnInit() {
    this.barChartType = 'horizontalBar';
    this.barChartLegend = false;
    // this.doughnutChartType = 'doughnut';
    this.pieChartType = 'pie';
    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }
}
