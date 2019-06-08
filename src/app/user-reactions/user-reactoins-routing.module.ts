import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserReactionsComponent } from './user-reactions.component';

const routes: Routes = [
  {
    path: '',
    component: UserReactionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReactionRoutingModule { }
