import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signIn(data) {
    const body = JSON.stringify(data);
    return this.http.post(environment.url + 'api/signin/', body, httpOptions )
  }

  signUp(data) {
    const body = JSON.stringify(data);
    return this.http.post(environment.url+ 'api/signup',body, httpOptions)
  }

}
