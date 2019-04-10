import { Component, OnInit, OnDestroy, OnChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ChannelService } from "../../core/services/channel.service";
import { Channel } from "../../shared/models/channel.model";
import { PatternGeneratorService } from "../../shared/pattern-generator.service";
import { UserService } from "../../shared/user.service";
import { User } from "src/app/shared/models/user.model";
import { Subscription } from "rxjs";
import { ChannelPermissionsService } from "../channel-permissions.service";

@Component({
  selector: "bs-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"]
})
export class ChannelComponent implements OnInit, OnChanges, OnDestroy {
  routeIdSubscription: Subscription;
  routeQuerySubscription: Subscription;

  channel: Partial<Channel>;
  headerImage: any;
  isUserOwner: boolean = false;
  isUserAdmin: boolean = false;
  selectedTabIndex: number = 0;
  isSysAdmin: boolean;
  user?: User;

  constructor(
    private userService: UserService,
    private channelPermissionsService: ChannelPermissionsService,
    private patternGenerator: PatternGeneratorService,
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private router: Router,
  ) {
    this.isSysAdmin = this.userService.currentUser.isSysAdmin;
    this.channelService.channelUpdated.subscribe(channel => {
      this.channel = channel;
      this.loadHeaderImage();
    });
  }

  getIsUserAdmin() {
    this.channelPermissionsService.getIsAdmin(this.channel.id).subscribe(isAdmin => {
      this.isUserAdmin = isAdmin;
    });
  }

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      if (params.userId) {
        this.loadUserProfile(params.userId);
      } else {
        this.loadChannel(params.id);
      }
    });

    this.routeQuerySubscription = this.route.queryParams.subscribe(query => {
      this.selectedTabIndex = Number(query.tabIndex) || 0;
    });
  }

  onTabIndexChange(event) {
    const index: number = event.index;
    this.router.navigate([], { queryParams: { tabIndex: index } });
  }

  ngOnChanges() {
    this.isUserOwner = this.channel.user === this.userService.currentUser.id;
    this.getIsUserAdmin();
  }

  loadHeaderImage() {
    const source = this.channel.isProfile ? this.channel.user : this.channel.name;
    this.headerImage = this.patternGenerator.getPatternAsSafeStyle(source);
  }

  loadChannel(id: string) {
    this.channelService.getChannel(id).subscribe(channel => {
      this.channel = channel;
      this.loadHeaderImage();
      this.isUserOwner = this.channel.user === this.userService.currentUser.id;

      if (this.channel.isProfile) {
        this.loadUser(channel.user);
      } else {
        this.getIsUserAdmin();
      }
    });
  }

  loadUser(user: string) {
    this.userService.get(user).subscribe(returnedUser => {
      this.user = returnedUser;
    });
  }

  loadUserProfile(user: string) {
    this.loadUser(user);

    this.channelService
      .getMany({ user, isProfile: true }, 0, 1)
      .subscribe(userProfile => {
        this.channel = userProfile[0];
        this.loadHeaderImage();
        this.isUserOwner =
          this.channel.user === this.userService.currentUser.id;
      });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.routeQuerySubscription.unsubscribe();
  }
}
