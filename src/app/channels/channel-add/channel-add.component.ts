import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'bs-channel-add',
  templateUrl: './channel-add.component.html',
  styleUrls: ['./channel-add.component.scss']
})
export class ChannelAddComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onClose() {
    this.location.back();
  }
}
