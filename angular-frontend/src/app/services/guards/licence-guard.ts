import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LicenceGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const agreed = localStorage.getItem('inlecom-agree');
    if (agreed) {
      return true;
    }
    // navigate to login page
    this._router.navigate(['licence']);
    return false;
  }
}
