import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [SearchResultsComponent]
})
export class SearchResultsModule { }
