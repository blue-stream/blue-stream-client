import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchString: string;

  constructor( private searchService: SearchService) { }

  onType(searchString: string) {
    this.searchString = searchString;
    console.log(this.searchString);
  }

  onSubmit() {
    this.searchService.searchSubmitted.next(this.searchString);
  }

}
