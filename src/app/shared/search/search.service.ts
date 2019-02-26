import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchTyped: Subject<string>;

  constructor() {
    this.searchTyped = new Subject<string>();
  }
}
