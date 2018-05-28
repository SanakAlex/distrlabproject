import { Injectable } from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../models/book.model";

@Injectable({
  providedIn: 'root'
})
export class BagService {

  private bagList: Book[] = [];
  bagSubject: Subject<Book[]> = new Subject<Book[]>();

  constructor() { }

  getBagList(): Book[] {
    return this.bagList;
  }

  subscribeOnBag(): Observable<Book[]> {
    return this.bagSubject.asObservable();
  }

  addBagItem(item) {
    item.orderedCount++;
    this.bagList.push(item);
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
    this.bagList = null;
    this.bagSubject.next(this.bagList);
  }

}
