import { Component, OnInit, Input } from '@angular/core';
import { Channel } from '../channel.model';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'bs-channel-manage',
  templateUrl: './channel-manage.component.html',
  styleUrls: ['./channel-manage.component.scss']
})
export class ChannelManageComponent implements OnInit {
  @Input() channel: Channel;
  isEditNameActive: boolean = false;
  isEditDescriptionActive: boolean = false;
  newName: string;
  newDescription: string;

  constructor(private channelService: ChannelService) { }

  ngOnInit() {
  }

  onEditName() {
    this.isEditNameActive = true;
    this.newName = this.channel.name;
  }

  onEditDescription() {
    this.isEditDescriptionActive = true;
    this.newDescription = this.channel.description;
  }

  cancelEditDescription() {
    this.isEditDescriptionActive = false;
  }

  cancelEditName() {
    this.isEditNameActive = false;
  }

  updateDescription() {
    this.channelService.updateDescription(this.channel.id, this.newDescription).subscribe(channel => {
      console.log(channel);
    });
  }

  updateName(name: string) {
    this.channelService.updateName(this.channel.id, this.newName).subscribe(channel => {
      console.log(channel);
    });
  }

}
