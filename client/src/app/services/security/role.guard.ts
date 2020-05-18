import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {StorageService} from './storage.service';
import {UserServices} from '../UserServices';

// import {LoginService} from './login.service';

@Injectable()
export class RoleAdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private userService: UserServices,
    private router: Router,
  ) {
  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!StorageService.get('userToken')) {
      const rolesAllowed = next.data.roles as Array<string>;
      const user = this.userService.decodeToken().user;
      if (rolesAllowed) {

        // check if user is allowed
        const match = rolesAllowed.find(ob => ob === user.role);
        if (match != null) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!StorageService.get('userToken')) {
      const user = this.userService.decodeToken().user;
      if (this.userService.decodeToken().user.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
