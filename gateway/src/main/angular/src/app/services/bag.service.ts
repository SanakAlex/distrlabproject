import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../models/book.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
  })
};

const httpOptionsLoadBooks = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
  })
};


@Injectable({
  providedIn: 'root'
})
export class BagService {

  private bagList: Book[] = [];
  bagSubject: Subject<Book[]> = new Subject<Book[]>();

  constructor(private http: HttpClient) { }

  getBagList(): Book[] {
    return this.bagList;
  }

  subscribeOnBag(): Observable<Book[]> {
    return this.bagSubject.asObservable();
  }

  setBagList(bag: Book[]) {
    // console.log('books: ', bag);
    this.bagList = bag;
    this.bagSubject.next(this.bagList);
  }

  addBagItem(item: Book) {
    this.addToBag(item).subscribe();
    const availableBook = this.bagList.find((book) => {
      return book.id === item.id;
    });
    if (availableBook) {
      availableBook.orderedCount++
    } else {
      item.orderedCount++;
      this.bagList.push(item);
    }
    this.bagSubject.next(this.bagList);
  }

  removeBagItem(id) {
    const deleteIndex = this.bagList.findIndex((book: Book,) => {
      return book.id === id;
    });
    this.bagList.splice(deleteIndex, 1);
    this.bagSubject.next(this.bagList);
  }

  changeBagItem(item) {
    const deleteIndex = this.bagList.findIndex((book: Book,) => {
      return book.id === item.id;
    });
    this.bagList.splice(deleteIndex, 1, item);
    this.bagSubject.next(this.bagList);
  }

  removeBag() {
    this.bagList = [];
    this.bagSubject.next(this.bagList);
  }

  loadBag() {
    return this.http.get(environment.url + 'bucket/', httpOptionsLoadBooks)
    // return this.http.get( 'api/book/', httpOptions)
      .pipe(
        map((bag: Book[]) => {
          // this.setBagList(bag);
          return bag;
        })
      )
  }

  addToBag(book) {
    const body = JSON.stringify(book);
    return this.http.post(environment.url + 'bucket/book', body, httpOptions)
    // return this.http.get( 'api/book/', httpOptions)
      .pipe(
        map((resp) => {
          // this.setBagList(bag);
          // console.log(resp);
          // return bag;
        })
      )
  }

}
