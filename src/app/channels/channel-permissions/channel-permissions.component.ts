import { Component, OnInit, Input } from '@angular/core';
import { ChannelPermissionsService } from '../channel-permissions.service';
import { UserPermissions } from '../user-permissions.model';
import { Channel } from '../channel.model';

@Component({
  selector: 'bs-channel-permissions',
  templateUrl: './channel-permissions.component.html',
  styleUrls: ['./channel-permissions.component.scss']
})
export class ChannelPermissionsComponent implements OnInit {

  @Input() channel: Channel;

  showForm: boolean = false;
  showEditForm: boolean = false;
  permittedUsers: UserPermissions[] = [];
  editedUser: string;

  constructor(private userPermissionsService: ChannelPermissionsService) {
    this.userPermissionsService.userPermissionCreated.subscribe((userPermissions) => {
      this.loadPermittedUsers();
    });

    this.userPermissionsService.userPermissionDeleted.subscribe((userPermissions) => {
      this.loadPermittedUsers();
    });
  }

  ngOnInit() {
    this.loadPermittedUsers();
  }

  loadPermittedUsers() {
    this.userPermissionsService.getChannelPermittedUsers(this.channel.id, 0, 10).subscribe((usersPermissions) => {
      this.permittedUsers = usersPermissions;
    });
  }

  onOpenEditForm(user: string) {
    this.editedUser = user;
    this.showEditForm = !this.showEditForm;
  }

  onOpenForm() {
    this.showForm = !this.showForm;
  }

}
