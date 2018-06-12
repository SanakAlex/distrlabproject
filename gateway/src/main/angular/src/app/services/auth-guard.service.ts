import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserService} from "./user.service";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private router: Router,
              private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      console.log(this.userService.getUser());
      console.log(localStorage.getItem('jwtToken'));
      if(this.userService.getUser() && localStorage.getItem('jwtToken')) {
        resolve(true);
      } else {
        this.router.navigate(['login']);
        resolve(false);
      }

    })
  }
}
