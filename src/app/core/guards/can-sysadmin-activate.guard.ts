import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Injectable()
export class CanSysAdminActivateGuard implements CanActivate {

  constructor(private userService: UserService) {}

  canActivate() {
    return this.userService.currentUser.isSysAdmin;
  }
}
