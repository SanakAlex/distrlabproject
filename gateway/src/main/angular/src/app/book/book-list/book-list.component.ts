import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/book.model";
import {FilterBooksService} from "../../services/filter-books.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: any;
  bookSubscription: Subscription;

  constructor(private router: Router,
              private booksService: BooksService,
              private filterBooksService: FilterBooksService) { }

  ngOnInit() {
    if(this.booksService.getBookList()) {
      this.books = this.booksService.getBookList();
    } else {
      this.filterBooksService.loadBooks();
    }

    this.bookSubscription = this.booksService.subscribeOnBooks()
      .subscribe((bookList: Book[]) => {
        this.books = bookList;
      })

  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

  addToBag(id) {

  }

}