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
              private userService: UserService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'searchInput': new FormControl(null, [Validators.required, Validators.email]),
      'searchType': new FormControl('Title', [Validators.required])
    });

    if(localStorage.getItem('user')) {
      const user = localStorage.getItem('user').split('\\');
      this.userService
        .setUser(new User(user[0], user[1], user[2] ? user[2] : ''));
    }

    this.user = this.userService.getUser();
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
    localStorage.removeItem('user');
    this.userService.removeUser();
    this.router.navigate(['book']);
  }

}
