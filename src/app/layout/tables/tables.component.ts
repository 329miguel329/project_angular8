import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    @ViewChild(DataTableDirective, {static: false})
    dtElement: DataTableDirective;
    dtOptions: any = {};
    // dtOptions: DataTables.Settings = {};
    persons: Person[];

  constructor(private http: HttpClient) { }

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
      columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    };
  }

    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit(): void {
        this.dtElement.dtInstance.then((dtInstance: any) => {
            // tslint:disable-next-line:no-console
            console.info('foobar');
            dtInstance.columns.adjust();
        });
    }
}
