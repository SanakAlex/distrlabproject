import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FilterBooksService} from "../../services/filter-books.service";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  createBookForm: FormGroup;
  constructor( private router: Router,
               private toastr: ToastrService,
               private booksService: BooksService,
               private filterBooksService: FilterBooksService) { }

  ngOnInit() {
    this.createBookForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'author': new FormControl(null, [Validators.required]),
      'genre': new FormControl(null, [Validators.required]),
      'price': new FormControl(null, [Validators.required]),
      'shortDescription': new FormControl(null),
    });
  }

  onSubmit(e) {
    e.stopPropagation();
    if (this.createBookForm.invalid) {
      this.createBookForm.markAsTouched();
      for (const control in this.createBookForm.controls) {
        if (this.createBookForm.controls.hasOwnProperty(control)) {
          this.createBookForm.controls[control].markAsTouched();
        }
      }
    } else {
      const sendingData = {
        title: this.createBookForm.get('title').value,
        author: this.createBookForm.get('author').value,
        genre: this.createBookForm.get('genre').value,
        price: this.createBookForm.get('price').value,
        shortDescription: this.createBookForm.get('shortDescription').value,
      };
      this.filterBooksService.addBook(sendingData).subscribe(book => {
        this.booksService.addBook(book);
        this.toastr.success('New book was successfully created!');
        this.router.navigate(['/books']);
      }, err => {
        this.toastr.error('Error with sending data!');
      });
    }
  }

}
