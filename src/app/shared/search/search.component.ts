import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ChannelService } from '../../core/services/channel.service';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Channel } from '../models/channel.model';

@Component({
  selector: 'bs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchString: string;
  searchTyped: Subject<string> = new Subject<string>();
  channels: Observable<Channel[]>;
  channelsToLoad = 10;

  constructor( private router: Router, private channelService: ChannelService ) {}

  onType(searchString: string) {
    this.searchString = searchString;
    this.searchTyped.next(this.searchString);
  }

  onSubmit() {
    this.router.navigate(['/results'], { queryParams: {search_query: this.searchString } });
  }

  ngOnInit(): void {
    this.channels = this.searchTyped.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap( (term: string) => this.loadSearchedChannels(term) ),
    );
  }

  loadSearchedChannels(term) {
    return this.channelService.search(term, 0, this.channelsToLoad);
  }

}
