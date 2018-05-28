import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book.model";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: string;
  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
      });
    this.book = this.booksService.getBook(this.id);
    console.log(this.book)
  }

}
