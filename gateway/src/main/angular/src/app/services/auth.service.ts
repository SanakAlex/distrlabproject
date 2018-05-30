import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RequestOptions} from "@angular/http";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Basic ' + btoa("browser:secret")
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  signIn(data) {
    let params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    params.append('grant_type', 'password');
    params.append('scope', 'ui');

    return this.http.post('uaa/oauth/token', params.toString(), httpOptions)
    // return this.http.post(environment.url + 'api/signin', body, httpOptions )
  }

  signUp(data) {
    let params = new URLSearchParams();
    params.append('login', data.login);
    params.append('email', data.email);
    params.append('password', data.password);

    // const body = JSON.stringify(data);
    return this.http.post('users/', params.toString())
    // return this.http.post(environment.url+ 'api/signup',body, httpOptions)
  }


}
