import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ComponentCanDeactivate } from './component-can-deactivate';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
    constructor(private translateService: TranslateService) { }

    canDeactivate(component: ComponentCanDeactivate): boolean {
        if (!component.canDeactivate()) {
            this.translateService.get('CORE.CAN_DEACTIVATE_GUARD.CONFIRM_MESSAGE')
                .subscribe(translation => {
                    if (confirm(translation)) {
                        return true;
                    } else {
                        return false;
                    }
                });
        }
        return true;
    }
}
