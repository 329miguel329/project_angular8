import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { EstudianteComponent } from './estudiante.component';
import { DataTablesModule } from 'angular-datatables';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, EstudianteRoutingModule, DataTablesModule, PageHeaderModule],
    declarations: [EstudianteComponent]
})
export class EstudianteModule {}
