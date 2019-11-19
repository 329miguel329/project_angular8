import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { ServicioUsuario } from '../servicios/usuario.service';
import { ServicioEstudiante } from '../servicios/estudiante.service';
import { ActivatedRoute } from '@angular/router';

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
 * @class EstudianteComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
  animations: [routerTransition()]
})
export class EstudianteComponent implements OnInit {
  dtOptions: DataTables.Settings = {}; // Variable dtOptions para cargar las configuraciones de DataTable
  persons: Estudiante[]; // Variable persons de tipo Estudiante(Array)

  /**
   * Crear instancia de EstudianteComponent.
   * @param {ActivatedRoute} route, con este parametro se reciben los parametros enviados por POST o GET
   * @param {HttpClient} http, parametro para conectar a un API
   * @param {ServicioEstudiante} servicioEstudiante, Parametro para recibir los datos desde firebase
   * @memberof EstudianteComponent
   */
  constructor (
    private route: ActivatedRoute,
    private http: HttpClient,
    private servicioEstudiante: ServicioEstudiante
  ) { }

  ngOnInit() {
    const that = this;

    // dtOptions, se inicializa las configuraciones de DataTable
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
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      }
    };
  }
}
