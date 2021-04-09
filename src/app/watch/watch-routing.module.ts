import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchComponent } from './watch.component';

const routes: Routes = [
  {
    path: 'undefined',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: WatchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchRoutingModule { }
