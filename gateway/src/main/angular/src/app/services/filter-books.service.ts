import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Book} from "../models/book.model";
import {BooksService} from "./books.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
  })
};
const httpOptionsBooks = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
const httpOptionsAddBook = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
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
    this.http.get( 'bookcase/searchGenre/' + catalog, httpOptions).subscribe((resp: any) => {
    // this.http.get( '/api/'+ catalog, httpOptions).subscribe((resp: any) => {
      this.booksService.setBookList(resp);
    }, err => {
    });
  }

  filterByInput(searchData) {
    this.http
      .get( 'bookcase/'+ searchData.searchType + '/' + searchData.searchInput, httpOptions)
      .subscribe((books: Book[]) => {
        this.booksService.setBookList(books);
        this.router.navigate(['book']);
      }, () => {
        console.log('can\'t load books');
      })
  }

  loadBooks() {
    return this.http.get( 'bookcase/', httpOptionsBooks)
    // return this.http.get( 'api/book/', httpOptions)
      .pipe(
        map((books: Book[]) => {
          this.booksService.setBookList(books);
          return true;
        })
      )
  }

  addBook(bookData) {
    const body = JSON.stringify({
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      price: bookData.price,
      availableCount: 0,
      orderedCount: 0,
      shortDescription: bookData.shortDescription ? bookData.shortDescription : '',
    });
    return this.http.post( 'bookcase/',body, httpOptionsAddBook);
    // return this.http.post(environment.url+ 'api/book',body, httpOptions)
  }


}
