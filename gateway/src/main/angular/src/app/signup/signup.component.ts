import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  message = '';

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
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
        login: this.signUpForm.get('login').value,
        email: this.signUpForm.get('email').value,
        password: this.signUpForm.get('password').value,
      };

      this.authService.signUp(sendingData).subscribe(data => {
        this.showSuccess();

      }, err => {
        this.message = 'Error with signing up!';
        // this.toastr.error('Error!');
      });
    }
  }

  showSuccess() {
    this.toastr.success('User successfully signed up!');
    this.router.navigate(['login']);
  }




}
