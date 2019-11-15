import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColegioComponent } from './colegio.component';

const routes: Routes = [
  {
    path: '',
    component: ColegioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColegioRoutingModule { }
