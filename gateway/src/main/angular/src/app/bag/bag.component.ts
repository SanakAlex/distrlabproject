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
  }

  countOrderPrice() {
    this.orderPrice = 0;
    for (let book of this.bagList) {
      this.orderPrice += book.orderedCount * book.price;
    }
  }

  deleteBook(id) {
    this.bagService.removeBagItem(id);
    this.countOrderPrice();
    // TODO send request for delete book from bagList
  }

  buyBooks() {
    this.toastr.success('You bought new books!', 'Congratulations');
    this.bagList = [];
  }

  minusItem(book: Book) {
    if (book.orderedCount >= 0) {
      book.orderedCount--;
    } else {
      book.orderedCount = 0;
    }
    this.countOrderPrice();
    this.bagService.changeBagItem(book);
  }

  plusItem(book: Book) {
    book.orderedCount++;
    this.countOrderPrice();
    this.bagService.changeBagItem(book);
  }


}
