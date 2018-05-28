import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../models/book.model";
import {User} from "../models/user.model";
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {FilterBooksService} from "./filter-books.service";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // private bookList: Book[] = [
  //   new Book('12qq', 'Volod', 'Volod', 'Fantastic', 345, 2, 0,'Volod'),
  //   new Book('12qq1', 'QWER', 'QWER', 'Detective', 310, 3, 0,'QWER'),
  //   new Book('12q1q', 'Asdfg', 'Asdfg', 'Fantastic', 23, 1, 0,'Asdfg'),
  //   new Book('12qq2', 'Volod 2', 'Volod 2', 'Fantastic', 44, 5, 0,'Volod 2'),
  // ];
  private bookList: Book[] = [];

  booksSubject: Subject<Book[]> = new Subject<Book[]>();


  constructor(private http: HttpClient) {

  }

  getBookList() {
    // http.get()
    return this.bookList.slice();
  }

  getBook(bookId) {
    return this.bookList.find((book: Book) => {
      return book['id'] === bookId;
    });
  }

  subscribeOnBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  setBookList(books: Book[]) {
    this.bookList = books;
    this.booksSubject.next(books);
  }

}
