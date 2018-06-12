import { Component, OnInit } from '@angular/core';
import {FilterBooksService} from "../services/filter-books.service";
import {GenresService} from "../services/genres.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  catalog: string[] = [
  ];
  constructor(private filterBooksService: FilterBooksService,
              private genresService: GenresService) { }

  ngOnInit() {
    this.genresService.loadGenres()
      .subscribe((genres: string[])=> {
        this.catalog = genres;
      });

  }

  loadBooks() {
    this.filterBooksService.loadBooks()
      .subscribe()
  }

  filterItem(item) {

    this.filterBooksService.filterByCatalog(item);
  }

}
