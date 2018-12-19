import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchSubmitted: Subject<string>;

  /* Put inside componenets you want to show search results (put http request there).
    this.searchService.searchSubmitted.subscribe((searchString) => {
      // DO STUFF
    });
  */

  constructor() { }
}
