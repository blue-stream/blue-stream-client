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
  totalPremittedUsersAmount: number = 0;
  editedUser: string;
  premittedUseresAmountToLoad: number = 10;

  constructor(private userPermissionsService: ChannelPermissionsService) {
    this.userPermissionsService.userPermissionCreated.subscribe((userPermissions) => {
      this.loadPermittedUsersAmount();
      this.loadPermittedUsers(0, this.premittedUseresAmountToLoad);
    });

    this.userPermissionsService.userPermissionDeleted.subscribe((userPermissions) => {
      this.loadPermittedUsersAmount();
      this.loadPermittedUsers(0, this.premittedUseresAmountToLoad);
    });
  }

  ngOnInit() {
    this.loadPermittedUsersAmount();
    this.loadPermittedUsers(0, this.premittedUseresAmountToLoad);
  }

  loadPermittedUsers(startIndex: number, premittedUsersToLoad: number) {
    const endIndex: number = startIndex + this.premittedUseresAmountToLoad;

    this.userPermissionsService.getChannelPermittedUsers(this.channel.id, startIndex, endIndex).subscribe((usersPermissions) => {
      if (startIndex === 0) {
        this.permittedUsers = usersPermissions;
      } else {
        this.permittedUsers = this.permittedUsers.concat(usersPermissions);
      }
    });
  }

  loadPermittedUsersAmount() {
    this.userPermissionsService.getChannelPermittedUsersAmount(this.channel.id).subscribe(amount => {
      this.totalPremittedUsersAmount = amount;
    });
  }

  onScroll() {
    this.loadNextPremittedUsers();
  }

  loadNextPremittedUsers() {
    this.loadPermittedUsers(
      this.permittedUsers.length,
      this.premittedUseresAmountToLoad);
  }

  onOpenEditForm(user: string) {
    this.editedUser = user;
    this.showEditForm = !this.showEditForm;
  }

  onOpenForm() {
    this.showForm = !this.showForm;
  }

}