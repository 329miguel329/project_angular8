import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColegioRoutingModule } from './colegio-routing.module';
import { ColegioComponent } from './colegio.component';

@NgModule({
  imports: [CommonModule, ColegioRoutingModule],
  declarations: [ColegioComponent]
})
export class ColegioModule { }
