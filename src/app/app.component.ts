import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavMode, routeConfig, defaultRouteConfig } from './route-specific.config';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isSideNavOpen: boolean = true;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    translate.use('he');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
