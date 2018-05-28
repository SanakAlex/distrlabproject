import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../models/book.model";
import {BooksService} from "./books.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':localStorage.getItem('jwtToken')
  })
};

@Injectable({
  providedIn: 'root'
})
export class FilterBooksService {

  constructor(private http: HttpClient,
              private booksService: BooksService,
              private router: Router) {
  }

  filterByCatalog(catalog) {
    this.http.get(environment.url + 'bookcase/searchGenre/' + catalog, httpOptions).subscribe((resp: any) => {
    // this.http.get(environment.url + '/api/'+ catalog, httpOptions).subscribe((resp: any) => {
      this.booksService.setBookList(resp);
    }, err => {
    });
  }

  filterByInput(searchData) {
    this.http
      .get(environment.url + 'bookcase/'+ searchData.searchType + '/' + searchData.searchInput, httpOptions)
      .subscribe((books: Book[]) => {
        this.booksService.setBookList(books);
        this.router.navigate(['book']);
      })
  }

  loadBooks() {
    console.log('request for bookList');
    return this.http.get(environment.url + 'bookcase/', httpOptions)
    // return this.http.get(environment.url + 'api/book/', httpOptions)
      .pipe(
        map((books: Book[]) => {
          this.booksService.setBookList(books);
          return true;
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: Response | any) {
    return Observable.throw(false);
  }

}
