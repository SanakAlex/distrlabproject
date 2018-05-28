import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs/internal/Subject";
// import {User} from "../models/user.models";
import {Observable} from "rxjs/internal/Observable";
import {User} from "../models/user.model";
// import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject: Subject<User> = new Subject<User>();
  private user: User;

  constructor(private http: HttpClient) {
  }

  getUser(): User {
    return this.user;
  }

  subscribeOnUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  setUser(user: User) {
    this.user = user;
    this.userSubject.next(user);
  }

  removeUser() {
    this.user = null;
    this.userSubject.next(this.user);
  }


}
