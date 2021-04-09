import { Component, OnInit, Input } from '@angular/core';
import { Classification } from 'src/app/shared/models/classification.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bs-watch-description',
  templateUrl: './watch-description.component.html',
  styleUrls: ['./watch-description.component.scss']
})
export class WatchDescriptionComponent implements OnInit {

  @Input() text: string;
  @Input() pp: Classification;
  @Input() source: Classification;
  @Input() tags: string[];

  expandDescription = false;
  amountOfTagsToShowInWatchPage = environment.amountOfTagsToShowInWatchPage;

  constructor() { }

  ngOnInit() {
  }

}
