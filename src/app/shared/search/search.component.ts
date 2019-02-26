import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchString: string;

  constructor( private searchService: SearchService, private router: Router) { }

  onType(searchString: string) {
    this.searchString = searchString;
    this.searchService.searchTyped.next(this.searchString);
  }

  onSubmit() {
    this.router.navigate(['/results'], { queryParams: {search_query: this.searchString } });
  }

}
