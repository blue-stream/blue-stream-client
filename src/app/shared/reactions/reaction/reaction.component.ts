import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements OnInit {

  @Input() iconName: string = 'thumb_up';
  @Input() amount: number = 0;
  @Input() isActive: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
