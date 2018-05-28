import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/book.model";
import {FilterBooksService} from "../../services/filter-books.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {BagService} from "../../services/bag.service";
import {ToastrService} from "ngx-toastr";

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
              private filterBooksService: FilterBooksService,
              private bagService: BagService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    if (this.booksService.getBookList() && this.booksService.getBookList().length) {
      this.books = this.booksService.getBookList();
    } else {
      this.filterBooksService.loadBooks()
        .subscribe((status) => {
          // if (!status) {
          //   this.toastr.error('Error with loading books!');
          // }
        }, (error) => {
          this.toastr.error('Error with loading books!');
        })
    }

    this.bookSubscription = this.booksService.subscribeOnBooks()
      .subscribe((bookList: Book[]) => {
        this.books = bookList;
      })

  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

  addToBag(book: Book) {
    this.bagService.addBagItem(book);
    this.toastr.success(book.title + ' added to bag!');
  }

}
