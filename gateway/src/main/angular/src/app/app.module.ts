import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import { BookComponent } from './book/book.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './header/header.component';
import {UserService} from "./services/user.service";
import { CatalogComponent } from './catalog/catalog.component';
import {FilterBooksService} from "./services/filter-books.service";
import {AuthService} from "./services/auth.service";
import {BooksService} from "./services/books.service";
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BagComponent } from './bag/bag.component';
import { AboutUsComponent } from './about-us/about-us.component';
import {BagService} from "./services/bag.service";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BookComponent,
    HeaderComponent,
    CatalogComponent,
    BookListComponent,
    BookDetailComponent,
    BagComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [
    UserService,
    FilterBooksService,
    AuthService,
    BooksService,
    BagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
