import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServicioColegio } from '../servicios/colegio.service';
import { routerTransition } from '../../router.animations';

class Colegio {
    codigo: string;
    nombre: string;
    constructor(colegio: any) {
        this.codigo = colegio.codigo;
        this.nombre = colegio.nombre;
    }
}

class DataTablesResponse {
    data: any[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
}

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.scss'],
  animations: [routerTransition()]
})
export class ColegioComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    colegios: Colegio[];

    constructor (private http: HttpClient, private servicioColegio: ServicioColegio) { }

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
                    this.servicioColegio.obtenerColegios()
                        .valueChanges().subscribe(colegios => {
                            console.log(colegios);
                            // dataTablesParameters.data =
                            that.colegios = colegios.map((colegio) => {
                                return new Colegio(colegio);
                            });
                        });
                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: that.colegios
                    });
                });
            }
        };
    }
}
