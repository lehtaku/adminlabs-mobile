import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public activePage: BehaviorSubject<string> = new BehaviorSubject('monitors');

  constructor() {}
}
