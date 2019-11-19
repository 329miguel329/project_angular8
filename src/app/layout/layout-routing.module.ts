import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'colegio', pathMatch: 'prefix' },
      { path: 'colegio', loadChildren: () => import('./colegio/colegio.module').then(m => m.ColegioModule) },
      { path: 'estadistica/:codigo', loadChildren: () => import('./estadistica/estadistica.module').then(m => m.EstadisticaModule) },
      { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'estudiante/:id', loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudianteModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
