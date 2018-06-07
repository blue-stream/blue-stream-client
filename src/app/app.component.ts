import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouteSpecificConfig, SideNavMode, routeConfig, defaultRouteConfig } from './route-specific.config';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isSideNavOpen: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getSideNavMode(): SideNavMode {
    let url: string = '';
    const endIndex = this.router.url.slice(1, this.router.url.length).indexOf('/');

    if (endIndex) {
      url = this.router.url.slice(0, endIndex + 1);
    } else {
      url = this.router.url.slice(0, this.router.url.length);
    }

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
