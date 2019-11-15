import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { routerTransition } from '../../router.animations';
import { ServicioUsuario } from '../servicios/usuario.service';

class Person {
    id: number;
    firstName: string;
    lastName: string;
    url: string;
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
    persons: Person[];
    usuarios = null;

    constructor (private http: HttpClient, private servicioUsuario: ServicioUsuario) {
        this.usuarios = servicioUsuario.obtenerUsuarios()
            .valueChanges().subscribe(usuarios => {
                this.usuarios = usuarios;
            });
        console.log(this.usuarios);
    }

    ngOnInit() {
        const that = this;

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 15,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http.post<DataTablesResponse>(
                    'https://angular-datatables-demo-server.herokuapp.com/',
                    dataTablesParameters, {}
                ).subscribe(resp => {
                    that.persons = resp.data;

                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }, {}]
        };
    }
}
