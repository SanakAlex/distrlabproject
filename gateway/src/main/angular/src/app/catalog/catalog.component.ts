import { Component, OnInit } from '@angular/core';
import {FilterBooksService} from "../services/filter-books.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalog: any[] = [
    ['For_kids','For kids'],
    ['Medicine','Medicine'],
    ['Art','Art'],
    ['Encyclopedias','Encyclopedias'],
    ['Legal_literature','Legal literature'],
    ['Pedagogy','Pedagogy'],
    ['Science','Science'],
    ['Fantastic','Fantastic'],
    ['Detectives','Detectives'],
  ];
  constructor(private filterBooksService: FilterBooksService) { }

  ngOnInit() {
  }

  filterItem(item) {
    this.filterBooksService.filterByCatalog(item);
  }

}
