import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()

export class EmbedService {
  public embedVideoRequested: Subject<void>;

  constructor() {
    this.embedVideoRequested = new Subject<void>();
  }
}
