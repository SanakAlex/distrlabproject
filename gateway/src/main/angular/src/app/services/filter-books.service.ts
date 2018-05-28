import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../models/book.model";
import {BooksService} from "./books.service";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')
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
    // this.http.get(environment.url + '/api/'+ catalog, httpOptions).subscribe((resp: any) => {
    //   this.booksService.setBookList(resp);
    // }, err => {
    // });
  }

  filterByInput(searchData) {
    this.http
      .get(environment.url + 'api/book/type/'
        + searchData.searchType + '/input/' + searchData.searchInput, httpOptions)
      .subscribe((books: Book[]) => {
        this.booksService.setBookList(books);
        this.router.navigate(['book']);
      })
  }

  loadBooks() {
    this.http.get(environment.url + 'api/book/', httpOptions)
      .subscribe((books: Book[]) => {
        this.booksService.setBookList(books);
      })
  }
}
