import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

  @Input() iconName: string = 'thumb_up';
  @Input() smallIcon: boolean = false;
  @Input() amount: number = 0;
  @Input() showAmount: boolean = true;
  @Input() isActive: boolean = false;
  @Input() toolTip: string = 'WATCH.WATCH_PRIMARY_INFO.LIKE';
  @Output() reactionSubmitted: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.reactionSubmitted.emit();
  }

}
