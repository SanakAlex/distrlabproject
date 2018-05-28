import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {BookComponent} from "./book/book.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {BookListComponent} from "./book/book-list/book-list.component";
import {BookDetailComponent} from "./book/book-detail/book-detail.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full'},
  { path: 'books', component: BookComponent, children: [
      {path: '', component: BookListComponent, pathMatch: 'full'},
      {path: ':id', component: BookDetailComponent}
    ] },
  { path: 'books/:book_id', component: BookComponent, data: { title: 'Book List' }, },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign Up' } },
  { path: '**', redirectTo: '/books' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
