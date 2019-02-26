import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'bs-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  routeQuerySubscription: any;

  ngOnInit() {
    this.routeQuerySubscription = this.route.queryParams
    .subscribe( params => {
      const search_query = params.search_query;
      this.loadSearchedVideos(search_query);
      this.loadSearchedChannels(search_query);
    });
  }

  ngOnDestroy() {
    this.routeQuerySubscription.unsubscribe();
  }

  loadSearchedVideos(search: string) {
    
  }

  loadSearchedChannels(search: string) {
    
  }

}
