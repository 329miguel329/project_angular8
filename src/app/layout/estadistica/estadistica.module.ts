import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { EstadisticaComponent } from './estadistica.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [CommonModule, Ng2Charts, EstadisticaRoutingModule, PageHeaderModule, NgbModule, DataTablesModule],
  declarations: [EstadisticaComponent]
})
export class EstadisticaModule {}
