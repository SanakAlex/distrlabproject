import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
// import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  message = '';
  sendingData: any;

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    });
  }


  onSubmit(e) {
    e.stopPropagation();
    if (this.signUpForm.invalid) {
      this.signUpForm.markAsTouched();
      for (const control in this.signUpForm.controls) {
        if (this.signUpForm.controls.hasOwnProperty(control)) {
          this.signUpForm.controls[control].markAsTouched();
        }
      }
    } else {
      const sendingData = {
        firstName: this.signUpForm.get('firstName').value,
        lastName: this.signUpForm.get('lastName').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('password').value,
      };
      this.authService.signUp(sendingData).subscribe(resp => {
        this.router.navigate(['login']);
      }, err => {
        this.message = err.error.msg;
      });
    }
  }

}
