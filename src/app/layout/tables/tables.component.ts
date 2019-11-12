import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient, HttpResponse } from '@angular/common/http';

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
  dtOptions: DataTables.Settings = {};
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
}
