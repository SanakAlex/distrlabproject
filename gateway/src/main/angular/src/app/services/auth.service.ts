import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RequestOptions} from "@angular/http";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa("browser:secret")
  })
};

const httpOptionsSignUp = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
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
    return this.http.post( environment.url + 'uaa/oauth/token', params.toString(), httpOptions)
    // return this.http.post( 'api/signin', body, httpOptions )
  }

  getUserData(token) {

    const httpOptionsGetData = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded',
        // 'Authorization': localStorage.getItem('jwtToken')
        'Authorization': 'Bearer ' + token
      })
    };
    localStorage.setItem('jwtToken', token);
    return this.http.get( 'users/current', httpOptionsGetData)
  }

  signUp(data) {
    const params = {
      login: data.login,
      email: data.email,
      password: data.password
    };

    return this.http.post( environment.url + 'users/', JSON.stringify(params), httpOptionsSignUp)
    // return this.http.post(environment.url+ 'api/signup',body, httpOptions)
  }


}
