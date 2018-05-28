export class Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  availableCount: number;
  shortDescription?: string

  constructor(id: string,
              title: string,
              author: string,
              genre: string,
              price: number,
              availableCount: number,
              shortDescription?: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.price = price;
    this.availableCount = availableCount;
    this.shortDescription = shortDescription;
  }
}
