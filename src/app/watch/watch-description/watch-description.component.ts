import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-watch-description',
  templateUrl: './watch-description.component.html',
  styleUrls: ['./watch-description.component.scss']
})
export class WatchDescriptionComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

}
