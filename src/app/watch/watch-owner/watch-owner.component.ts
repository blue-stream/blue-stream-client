import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-watch-owner',
  templateUrl: './watch-owner.component.html',
  styleUrls: ['./watch-owner.component.scss']
})
export class WatchOwnerComponent implements OnInit {

  @Input() owner: string;
  @Input() publishDate: string;
  currentUser: string = 'user@domain';

  constructor() { }

  ngOnInit() {
  }
}
