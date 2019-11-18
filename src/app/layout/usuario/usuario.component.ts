import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { ServicioUsuario } from '../servicios/usuario.service';
import { ServicioEstudiante } from '../servicios/estudiante.service';

class Person {
  id: number;
  firstName: string;
  lastName: string;
  url: string;
  constructor (usuario: any) {
    this.id = usuario.id;
    this.firstName = usuario.firstName;
    this.lastName = usuario.lastName;
    this.url = usuario.url;
  }
}

class Estudiante {
  id: number;
  nombreCompleto: string;
  colegio: string;
  numeroRetos: number;
  correctas: number;
  incorrectas: number;
  tiempoRetosSeg: number;
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

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
  animations: [routerTransition()]
})
export class UsuarioComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: Estudiante[];
  usuarios = null;

  constructor (private http: HttpClient, private servicioUsuario: ServicioUsuario, private servicioEstudiante: ServicioEstudiante) { }

  ngOnInit() {
    const that = this;

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
