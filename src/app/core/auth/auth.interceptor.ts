import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
            setHeaders: {
                'Authorization':
                    `Bearer ${this.cookieService.get(environment.authenticationToken)}`,
            },
        });

        return next.handle(req);
    }
}
