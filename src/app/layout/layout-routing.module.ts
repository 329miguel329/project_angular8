import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'colegio', pathMatch: 'prefix' },
      // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    //   { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
    //   { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
      { path: 'colegio', loadChildren: () => import('./colegio/colegio.module').then(m => m.ColegioModule) },
      { path: 'estadistica/:codigo', loadChildren: () => import('./estadistica/estadistica.module').then(m => m.EstadisticaModule) },
      { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'estudiante/:id', loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudianteModule) }
      // { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
      // { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
      // { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
      // { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
      // { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
