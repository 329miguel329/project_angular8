import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { EstadisticaRoutingModule } from './estadistica-routing.module';
import { EstadisticaComponent } from './estadistica.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, Ng2Charts, EstadisticaRoutingModule, PageHeaderModule],
    declarations: [EstadisticaComponent]
})
export class EstadisticaModule {}
