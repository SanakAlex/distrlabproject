import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {BooksService} from "../services/books.service";
import {FilterBooksService} from "../services/filter-books.service";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";

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
              private filterBooksService: FilterBooksService,
              private userService: UserService,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
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
        username: this.logInForm.get('username').value,
        password: this.logInForm.get('password').value,
      };
      new Promise((resolve, reject) => {
        this.authService.signIn(loginData)
          .subscribe((resp: any) => {
            resolve(resp.access_token);
            this.saveToken(resp);
          }, err => {
            reject();
              this.message = "Error! Invalid entered data";
          })}).then((token) => {
        this.authService.getUserData(token)
          .subscribe((resp) => {
            this.saveUser(resp);
          })
      }, (error) => {
            console.log('Error with login')
      });

    }
  }
  saveToken(token) {
    localStorage.setItem('jwtToken', token.access_token);
  }
  saveUser(user) {
    localStorage.setItem('login', user.login);
    localStorage.setItem('email', user.email);
    this.userService.setUser(new User(user.login, user.email));
    this.filterBooksService.loadBooks();
    this.router.navigate(['books']);
  }


}
