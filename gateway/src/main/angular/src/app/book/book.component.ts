import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {FilterBooksService} from "../services/filter-books.service";
import {Subscription} from "rxjs/internal/Subscription";
import {OnDestroy} from '@angular/core';
import {BooksService} from "../services/books.service";
import {Book} from "../models/book.model";

// import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
