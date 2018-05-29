import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {BookComponent} from "./book/book.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {BookListComponent} from "./book/book-list/book-list.component";
import {BookDetailComponent} from "./book/book-detail/book-detail.component";
import {BagComponent} from "./bag/bag.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {AuthGuard} from "./services/auth-guard.service";
import {CreateBookComponent} from "./book/create-book/create-book.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'books', canActivate: [AuthGuard], component: BookComponent, children: [
      {path: '', component: BookListComponent, pathMatch: 'full'},
      {path: 'new-book', component: CreateBookComponent},
      {path: ':id', component: BookDetailComponent}
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'bag', canActivate: [AuthGuard], component: BagComponent },
  { path: 'about-us', canActivate: [AuthGuard], component: AboutUsComponent },
  { path: 'contact-us', canActivate: [AuthGuard], component: ContactUsComponent },
  { path: '**', redirectTo: 'login' }
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
