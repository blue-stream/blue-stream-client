import { Component, OnInit, Input } from '@angular/core';
import { Classification } from 'src/app/shared/models/classification.model';

@Component({
  selector: 'bs-watch-description',
  templateUrl: './watch-description.component.html',
  styleUrls: ['./watch-description.component.scss']
})
export class WatchDescriptionComponent implements OnInit {

  @Input() text: string;
  @Input() pp: Classification;
  @Input() source: Classification;
  constructor() { }

  ngOnInit() {
  }

}
