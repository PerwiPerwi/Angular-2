import { Injectable} from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./services/authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  
  constructor(private authenticationService: AuthenticationService) {
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authenticationService.isAuthenticated();
  }
}
