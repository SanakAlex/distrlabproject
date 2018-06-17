import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../models/book.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    // 'Authorization': localStorage.getItem('jwtToken')
  })
};


@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private genre: any[] = [];

  genreSubject: Subject<Book[]> = new Subject<Book[]>();

  constructor(private http: HttpClient) { }

  loadGenres() {
    return this.http.get( environment.url + 'bookcase/genres/', httpOptions)
  }

  setGenres(genre: any[]) {
    this.genre = genre;
    this.genreSubject.next(this.genre);
  }

  subscribeOnBooks(): Observable<any[]> {
    return this.genreSubject.asObservable();
  }
}
