import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    constructor(private translateService: TranslateService) { }

    // Translation service was not added here because of problems caused by it's async features (Can't get translation sync way)
    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (!component.canDeactivate()) {
            if (confirm('You have unsaved changes, are you sure you want to leave?')) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
