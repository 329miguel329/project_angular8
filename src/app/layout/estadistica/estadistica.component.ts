import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServicioEstudiante } from '../servicios/estudiante.service';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

/**
 * @class Estudiante
 */
class Estudiante {
  id: number;
  nombreCompleto: string;
  colegio: string;
  numeroRetos: number;
  correctas: number;
  incorrectas: number;
  tiempoRetosSeg: number;
  /**
   * Crear instancia de Estudiante.
   * @param {object} estudiante
   * Se revcibe un objeto desde firebase.
   */
  constructor (estudiante: any) {
    this.id = estudiante.id;
    this.nombreCompleto = estudiante.nombreCompleto;
    this.colegio = estudiante.colegio;
    this.numeroRetos = estudiante.numeroRetos;
    this.correctas = estudiante.correctas;
    this.incorrectas = estudiante.incorrectas;
    this.tiempoRetosSeg = estudiante.tiempoRetosSeg;
  }
}

/**
 * @class DataTablesResponse
 */
class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

/**
 * @export
 * @class EstadisticaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
  animations: [routerTransition()]
})
export class EstadisticaComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: Estudiante[];

  // bar chart
  // Iniccializar opciones para cargar el grafico de barras
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
  // Iniccializar opciones para cargar el grafico de torta
  public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string;

  // lineChart
  // Iniccializar opciones para cargar el grafico de línea
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
    // { data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86], label: 'Series B', fill: false, lineTension: 0 },
    // { data: [18, 48, 77, 9, 100, 27, 40, 77, 9, 100], label: 'Series C', fill: false, lineTension: 0 }
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
  }

  public chartHovered(e: any): void {
  }

  /**
   * Función para escuchar los evenos de cambio en el acordeon
   * se puede utilizar para cargar los datos cada vez que se cambie el estado del acordion
   * @param {NgbPanelChangeEvent} props
   * parametro del evento que se ejcuta al cambiar de estado el acordion
   * @memberof EstadisticaComponent
   */
  public toggleAccordian(props: NgbPanelChangeEvent): void {
    props.nextState; // true === panel is toggling to an open state
    // false === panel is toggling to a closed state
    props.panelId;    // the ID of the panel that was clicked
    // props.preventDefault(); // don't toggle the state of the selected panel
    if (props.nextState && props.panelId === 'static-5') {
      // this.initializeDatatable();
    }
  }

  /**
   *Función para inicializar la tabla de estudiantes
   * @memberof EstadisticaComponent
   */
  public initializeDatatable() {
    const that = this;

    // dtOptions se carga la respectiva configuración de DataTable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      serverSide: true,
      processing: true,
      autoWidth: false,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<DataTablesResponse>(
          'https://angular-datatables-demo-server.herokuapp.com/',
          dataTablesParameters, {}
        ).subscribe(resp => {
          this.servicioEstudiante.obtenerEstudiantes()
            .valueChanges().subscribe(estudiantes => {
              that.persons = estudiantes.map((estudiante) => {
                return new Estudiante(estudiante);
              });
            });

          callback({
            recordsTotal: 1,
            recordsFiltered: 1,
            data: []
          });
        });
      }
    };
  }

  /**
   * Crear instancia de EstadisticaComponent.
   * @param {ActivatedRoute} route, recibir parametros de tipo POST o GET
   * @param {HttpClient} http, conectarse a un API externa
   * @param {ServicioEstudiante} servicioEstudiante, Obtener listado de estudiantes
   * @memberof EstadisticaComponent
   */
  constructor (private route: ActivatedRoute, private http: HttpClient, private servicioEstudiante: ServicioEstudiante) {
  }

  /**
   * Inicializar todos los graficos correspondientes
   * @memberof EstadisticaComponent
   */
  ngOnInit() {
    this.barChartType = 'horizontalBar';
    this.barChartLegend = false;
    // this.doughnutChartType = 'doughnut';
    this.pieChartType = 'pie';
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.initializeDatatable();
  }
}
