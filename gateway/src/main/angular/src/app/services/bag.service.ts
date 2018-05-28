import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {Subject} from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class BagService {

  private bag: any;

  constructor() { }
}
