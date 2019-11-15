import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { ServicioUsuario } from '../servicios/usuario.service';
import { ServicioEstudiante } from '../servicios/estudiante.service';
import { ActivatedRoute } from '@angular/router';


class Estudiante {
    id: number;
    nombreCompleto: string;
    colegio: string;
    numeroRetos: number;
    correctas: number;
    incorrectas: number;
    tiempoRetosSeg: number;
    constructor(estudiante: any) {
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
    selector: 'app-estudiante',
    templateUrl: './estudiante.component.html',
    styleUrls: ['./estudiante.component.scss'],
    animations: [routerTransition()]
})
export class EstudianteComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    persons: Estudiante[];
    usuarios = null;

    constructor (
        private route: ActivatedRoute,
        private http: HttpClient,
        private servicioUsuario: ServicioUsuario,
        private servicioEstudiante: ServicioEstudiante
    ) {
        console.log(this.route.snapshot.params);
    }

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
                        });                    // that.persons = this.usuarios;

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
