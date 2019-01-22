import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchSubmitted: Subject<string>;
  public searchTyped: Subject<string>;

  constructor() {
    this.searchSubmitted = new Subject<string>();
    this.searchTyped = new Subject<string>();
  }
}
