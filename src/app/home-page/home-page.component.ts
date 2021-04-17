import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  options: string[] = ['lekarz', 'pacjent'];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(option: string) {
    for(let i = 0; i < this.options.length; i++){

    }
    console.log(option);
  }
}
