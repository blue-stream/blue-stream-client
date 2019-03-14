import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsRoutingModule } from './search-results-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoResultsFoundComponent } from './no-results-found/no-results-found.component';

@NgModule({
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [SearchResultsComponent, NoResultsFoundComponent]
})
export class SearchResultsModule { }
