import { AfterViewInit, Component, OnInit, Renderer } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServicioColegio } from '../servicios/colegio.service';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

class Colegio {
    codigo: string;
    nombre: string;
    constructor(colegio: any) {
        this.codigo = colegio.codigo;
        this.nombre = colegio.nombre;
    }
}

class DataTablesResponse {
    data: Colegio[];
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
export class ColegioComponent implements OnInit, AfterViewInit {
    dtOptions: DataTables.Settings = {};
    colegios: Colegio[];

    constructor (
        private http: HttpClient,
        private servicioColegio: ServicioColegio,
        private renderer: Renderer,
        private router: Router) {

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
                this.servicioColegio.obtenerColegios()
                    .valueChanges().subscribe(colegios => {
                        console.log(colegios);
                        that.colegios = colegios.map((colegio) => {
                            return new Colegio(colegio);
                        });
                        callback({
                            recordsTotal: 50,
                            recordsFiltered: 1,
                            data: colegios.map((colegio) => {
                                return new Colegio(colegio);
                            })
                        });
                    });

            },
            columns: [
                {data: 'nombre'},
                {data: 'codigo'},
                {
                    title: 'Action',
                    render: function (data: any, type: any, full: any) {
                        // tslint:disable-next-line:max-line-length
                        return '<a class="list-group-item btn" view-person-id="' + full.codigo + '"><li class="fa fa-eye"></li></a>';
                    }
                }
            ]
        };
    }

    ngAfterViewInit(): void {
        this.renderer.listenGlobal('document', 'click', (event) => {
            if (event.target.hasAttribute('view-person-id')) {
                this.router.navigate(['/estadistica/' + event.target.getAttribute('view-person-id')]);
            }
        });
    }
}
