import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { defaultRouteConfig, routeConfig, SideNavMode } from './route-specific.config';
import { UserService } from './shared/user.service';
import { User } from './shared/models/user.model';
import { EmbedService } from './core/services/embed.service';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isSideNavOpen: boolean = true;
  isToolbarDisplayed: boolean = true;
  isBrowserSupported: boolean;
  currentUser: User;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService,
    public userService: UserService,
    private router: Router,
    private embedService: EmbedService,
  ) {
    translate.setDefaultLang('en');
    translate.use('he');
    moment.locale(translate.currentLang);
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isBrowserSupported = CSS.supports('display', 'grid');
    this.currentUser = userService.currentUser;

    if (typeof (Storage) !== 'undefined' && localStorage.getItem('callbackPath') !== null) {
      const callbackPath = localStorage.getItem('callbackPath');
      localStorage.removeItem('callbackPath');
      this.router.navigate([callbackPath]);
    }

    this.embedService.embedVideoRequested.subscribe(() => {
      this.hideBars();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  hideBars() {
    this.isSideNavOpen = false;
    this.isToolbarDisplayed = false;
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
