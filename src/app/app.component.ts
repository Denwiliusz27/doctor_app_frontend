import { Component } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {observable, ReplaySubject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    this.observable1.subscribe((value) => {
      console.log(value);
    });
  }

  observable1 = new ReplaySubject();
  i = 1;

  open() {
    this.i++;
    this.observable1.next(this.i);
  }
}

