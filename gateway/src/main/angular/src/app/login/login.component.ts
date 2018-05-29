import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
// import { Observable } from 'rxjs/Observable';
import {tap, catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {BooksService} from "../services/books.service";
import {FilterBooksService} from "../services/filter-books.service";

// import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  message = '';

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private filterBooksService: FilterBooksService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(e) {
    e.stopPropagation();
    if (this.logInForm.invalid) {
      this.logInForm.markAsTouched();
      for (const control in this.logInForm.controls) {
        if (this.logInForm.controls.hasOwnProperty(control)) {
          this.logInForm.controls[control].markAsTouched();
        }
      }
    } else {
      const loginData = {
        email: this.logInForm.get('email').value,
        password: this.logInForm.get('password').value,
      };
      this.authService.signIn(loginData)
        .subscribe((resp: any) => {
          localStorage.setItem('jwtToken', resp.token);
          localStorage.setItem('user', [resp.login, resp.email].join('\\'));
          this.userService
            .setUser(new User(resp.login, resp.email));
          this.filterBooksService.loadBooks();
          this.toastr.success('Logged In!');
          this.router.navigate(['books']);
        }, err => {
          this.message = "Error! Invalid entered data";
        });
    }
  }


}
