import {Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {BagService} from "../services/bag.service";
import {Subscription} from "rxjs/internal/Subscription";
import {User} from "../models/user.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {
  message: string;
  type: string;
  orderPrice: number = 0;

  bagList: Book[] = [];
  bagSubscription: Subscription;

  constructor(private bagService: BagService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.bagList = this.bagService.getBagList();
    this.countOrderPrice();
    this.bagSubscription = this.bagService.subscribeOnBag()
      .subscribe((bags: Book[]) => {
        this.bagList = bags;
        this.countOrderPrice();
      });
    this.bagService.loadBag()
      .subscribe((book: Book[]) => {
        if (book) {
          this.bagService.setBagList(book);

        }
      });
  }

  countOrderPrice() {
    this.orderPrice = 0;
    for (let book of this.bagList) {
      this.orderPrice += book.orderedCount * book.price;
    }
  }

  deleteBook(book) {
    this.bagService.removeBook(book)
      .subscribe((books) => {
        this.bagService.setBagList(books);
        this.toastr.info(book.title + ' was removed');
      });
  }

  buyBooks() {
    this.bagService.removeBucket()
      .subscribe((resp) => {
        this.toastr.success('You bought new books!', 'Congratulations');
        this.bagService.removeBag();
      });
  }

  minusItem(book: Book) {
    if (book.orderedCount > 1) {
      book.orderedCount--;
      this.bagService.updateBook(book).subscribe();
    } else if (book.orderedCount == 1) {
      this.deleteBook(book);
    }
    this.countOrderPrice();
  }

  plusItem(book: Book) {
    book.orderedCount++;
    this.countOrderPrice();
    this.bagService.updateBook(book).subscribe()
    // this.bagService.changeBagItem(book);
  }


}
