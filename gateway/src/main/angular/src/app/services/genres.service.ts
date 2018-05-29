import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../models/book.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':localStorage.getItem('jwtToken')
  })
};


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  loadGenres() {
    console.log('request for genres');
    return this.http.get(environment.url + 'bookcase/genres/', httpOptions)
    // return this.http.get(environment.url + 'api/genres/', httpOptions)
  }
}
