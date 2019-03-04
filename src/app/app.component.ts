import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavMode, routeConfig, defaultRouteConfig } from './route-specific.config';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ChannelService } from './core/services/channel.service';
import { UserService } from './shared/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Channel } from './shared/models/channel.model';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  isSideNavOpen: boolean = true;
  private _mobileQueryListener: () => void;

  myChannelId: Observable<string>;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService,
    private channelService: ChannelService,
    private userService: UserService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('he');
    moment.locale(translate.currentLang);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.myChannelId = this.channelService.getMany({user: this.userService.currentUser.id, isProfile: true}, 0, 1 )
    .pipe(
      map(arr => arr[0].id)
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getSideNavMode(): SideNavMode {
    const urlRegex: RegExp = /(?!\/)\w+(?=\/)/;
    const urlRegexExec: RegExpExecArray = urlRegex.exec(this.router.url);
    const url: string = urlRegexExec ? urlRegexExec[0] : '';

    if (routeConfig[url]) {
      if (routeConfig[url].sideNavMode === 'side') {
        this.isSideNavOpen = !this.mobileQuery.matches;
        return this.mobileQuery.matches ? 'over' : 'side';
      } else {
        this.isSideNavOpen = routeConfig[url].isNavDefaultlyOpen;
      }

      return routeConfig[url].sideNavMode;
    }

    return defaultRouteConfig.sideNavMode;
  }
}
