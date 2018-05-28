import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book.model";
import {BagService} from "../../services/bag.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  id: string;
  book: Book;


  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private bagService: BagService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id']
      });
    this.book = this.booksService.getBook(this.id);
    console.log(this.book)
  }

  addToBag(book) {
    this.bagService.addBagItem(book);
    this.toastr.success(book.title + ' added to bag!');
  }

}
