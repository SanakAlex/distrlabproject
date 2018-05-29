import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic YnJvd3Nlcjo='
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  signIn(data) {
    // const body = JSON.stringify(data);
    const body = JSON.stringify({
      scope: 'ui',
      username: data.email,
      password: data.password,
      grant_type: 'password'
    });
    return this.http.post(environment.url + 'uaa/oauth/token/', body, httpOptions )
    // return this.http.post(environment.url + 'api/signin', body, httpOptions )
  }

  signUp(data) {
    // const body = JSON.stringify(data);
    const body = JSON.stringify({
      login: data.login,
      email: data.email,
      password: data.password,
    });
    return this.http.post(environment.url + 'uaa/users/', body, httpOptions )
    // return this.http.post(environment.url+ 'api/signup',body, httpOptions)
  }


}
