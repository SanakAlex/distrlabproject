import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";
import {User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {FilterBooksService} from "../services/filter-books.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  searchData: any;
  searchForm: FormGroup;

  userSubscription: Subscription;
  user: User;

  constructor(private http: HttpClient,
              private router: Router,
              private filterBooksService: FilterBooksService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchInput': new FormControl("", [Validators.required, Validators.email]),
      'searchType': new FormControl('searchTitle', [Validators.required])
    });
    if (localStorage.getItem('login') && localStorage.getItem('email')) {
      this.userService
        .setUser(new User(localStorage.getItem('login'), localStorage.getItem('email') ));
    }

    this.user = this.userService.getUser();
    if(this.user) {
      this.router.navigate(['books']);
    }
    this.userSubscription = this.userService.subscribeOnUser()
      .subscribe((user: User) => {
        this.user = user
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSubmit() {
    this.searchData = {
      searchInput: this.searchForm.get('searchInput').value,
      searchType: this.searchForm.get('searchType').value,
    };
    // TODO fix request with toastr
    this.filterBooksService.filterByInput(this.searchData)

  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('login');
    localStorage.removeItem('email');
    this.userService.removeUser();
    this.router.navigate(['/login']);
  }

}
