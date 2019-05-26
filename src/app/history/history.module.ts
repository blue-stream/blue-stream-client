import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { SharedModule } from '../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HistoryRoutingModule } from './history-routing.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    InfiniteScrollModule,
    HistoryRoutingModule,
  ]
})
export class HistoryModule { }
