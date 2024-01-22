import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@angular/core';

  
@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ){}
  
  
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{ 
    const authentication = this.authService.getAuth();
    if (!authentication || new Date(authentication.expirationDate) < new Date()) {
      this.router.navigate(['login']);
    }
  return !!authentication;
  }

}

