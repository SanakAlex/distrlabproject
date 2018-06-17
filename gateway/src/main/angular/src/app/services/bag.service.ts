import {Injectable} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../models/book.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";

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

  constructor(private http: HttpClient) {
  }

  getBagList(): Book[] {
    return this.bagList;
  }

  subscribeOnBag(): Observable<Book[]> {
    return this.bagSubject.asObservable();
  }

  setBagList(bags) {
    this.bagList = [];
    for (const item in bags.books) {
      this.bagList.push(bags.books[item]);
    }
    this.bagSubject.next(this.bagList);
  }

  addBagItem(item: Book) {
    const availableBook = this.bagList.find((book) => {
      return book.id === item.id;
    });
    if (availableBook) {
      availableBook.orderedCount++;
    } else {
      item.orderedCount = 1;
      this.bagList.push(item);
    }
    this.addToBag(item).subscribe();
    this.bagSubject.next(this.bagList);
  }

  removeBagItem(id) {
    const deleteIndex = this.bagList.findIndex((book: Book) => {
      return book.id === id;
    });

    this.bagList.splice(deleteIndex, 1);
    if (this.bagList.length === 0) {
      this.bagSubject.next([]);
    } else {
      this.bagSubject.next(this.bagList);
    }
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
    return this.http.get(environment.url + 'bucket/', httpOptions)
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
      .pipe(
      )
  }

  updateBook(book) {
    const body = JSON.stringify(book);
    return this.http.post(environment.url + 'bucket/book', body, httpOptions)
      .pipe(
        catchError((error: Response) => {
          return Observable.throw(error.json());
        })
      )
  }

  removeBook(book: Book) {
    const body = JSON.stringify(book);
    return this.http.request('delete', environment.url + 'bucket/book', {body: body, headers: httpOptions.headers})
    // return this.http.get( 'api/book/', httpOptions)
      .pipe(
        catchError((error: Response) => {
          return Observable.throw(error.json());
        })
      )
  }

  removeBucket() {
    return this.http.request('delete', environment.url + 'bucket/', { headers: httpOptions.headers})
    // return this.http.get( 'api/book/', httpOptions)
      .pipe(
        catchError((error: Response) => {
          return Observable.throw(error.json());
        })
      )
  }

}
