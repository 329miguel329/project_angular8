import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegioRoutingModule } from './colegio-routing.module';
import { ColegioComponent } from './colegio.component';
import { DataTablesModule } from 'angular-datatables';
import { PageHeaderModule } from './../../shared';

@NgModule({
  imports: [CommonModule, ColegioRoutingModule, DataTablesModule, PageHeaderModule],
  declarations: [ColegioComponent]
})
export class ColegioModule { }
