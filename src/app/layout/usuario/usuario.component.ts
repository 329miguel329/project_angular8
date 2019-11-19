import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { ServicioUsuario } from '../servicios/usuario.service';
import { ServicioEstudiante } from '../servicios/estudiante.service';

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
   * Crear una instancia de Estudiante.
   * @param {object} estudiante
   * @memberof Estudiante
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
 * @class UsuarioComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
  dtOptions: DataTables.Settings = {}; // Se declara variable dtOptions de tipo DataTables.Settings
  persons: Estudiante[]; // Se declara varialbe persons de tipo Estudiante(Array)

  /**
   * Crear una instancia de UsuarioComponent.
   * @param {HttpClient} http
   * @param {ServicioUsuario} servicioUsuario
   * @param {ServicioEstudiante} servicioEstudiante
   * @memberof UsuarioComponent
   */
  constructor (private http: HttpClient, private servicioUsuario: ServicioUsuario, private servicioEstudiante: ServicioEstudiante) { }

  /**
   * @memberof UsuarioComponent
   */
  ngOnInit() {
    const that = this;
    // Se inicializa dtOptions con su respectiva configuración para cargar los datos del DataTable
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
