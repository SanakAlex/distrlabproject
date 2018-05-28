import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  developersList = [
    'Jane Goncharenko',
    'Ira Shevchuk',
    'Kirill Kiforchuk',
    'Alex Sanak',
    'Volodymyr Lopukhovych',
  ];
  constructor() { }

  ngOnInit() {
  }

}
