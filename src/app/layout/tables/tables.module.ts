import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, DataTablesModule],
  declarations: [
    TablesComponent
  ]
})
export class TablesModule { }
