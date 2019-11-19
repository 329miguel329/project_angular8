import { AfterViewInit, Component, OnInit, Renderer } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ServicioColegio } from '../servicios/colegio.service';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';

/**
 * @class Colegio
 */
class Colegio {
  codigo: string;
  nombre: string;
  /**
   * Crear instancia de Colegio.
   * @param {object} colegio, Objeto que viene de firebase
   * @memberof Colegio
   */
  constructor (colegio: any) {
    this.codigo = colegio.codigo;
    this.nombre = colegio.nombre;
  }
}

/**
 * @export
 * @class ColegioComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.scss'],
  animations: [routerTransition()]
})
export class ColegioComponent implements OnInit, AfterViewInit {
  dtOptions: DataTables.Settings = {}; // Variable dtOptions para cargar las configuraciones de DataTable
  colegios: Colegio[]; // Variable colegios de tipo Colegio(Array)

  /**
   * Crear instancia de ColegioComponent.
   * @param {ServicioColegio} servicioColegio, parametro para recibir los datos de firebase
   * @param {Renderer} renderer, parametro para navegar a diferentes rutas
   * @param {Router} router, parametro para recibir parametros de tipo GET o POST
   * @memberof ColegioComponent
   */
  constructor (
    private servicioColegio: ServicioColegio,
    private renderer: Renderer,
    private router: Router) { }

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
        this.servicioColegio.obtenerColegios()
          .valueChanges().subscribe(colegios => {
            console.log(colegios);
            that.colegios = colegios.map((colegio) => {
              return new Colegio(colegio);
            });
            callback({
              recordsTotal: colegios.length,
              recordsFiltered: 1,
              data: colegios.map((colegio) => {
                return new Colegio(colegio);
              })
            });
          });

      },
      columns: [
        { data: 'nombre' },
        { data: 'codigo' },
        {
          title: 'Action',
          render: function (data: any, type: any, full: any) {
            return '<a class="list-group-item btn" view-person-id="'
              + full.codigo + '"><li class="fa fa-eye"></li></a>';
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
