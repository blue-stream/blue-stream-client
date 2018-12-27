import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'bs-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() source: string;
  @Input() size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' = 'medium';
  @Input() alt?: string;

  constructor() { }

  ngOnInit() {
  }

}
