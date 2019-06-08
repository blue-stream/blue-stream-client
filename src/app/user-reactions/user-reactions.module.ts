import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReactionsComponent } from './user-reactions.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserReactionRoutingModule } from './user-reactoins-routing.module';

@NgModule({
  declarations: [UserReactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    UserReactionRoutingModule,
  ]
})
export class UserReactionsModule { }
