import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root'
})
export class HasUserGuard implements CanActivate { // a pour role d'activer et desactiver des routes (si canActivate retourne true => ca active la route, sinon ca la desactive ).note : on a ajouté : canActivate: [HasUserGuard] dans la route (path: 'signin')
  public constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userService.isAuthenticated()) {
      //this.router.navigate(['/', 'interns']);
      return false;
    } else {
      return true;
    }
  }

}
