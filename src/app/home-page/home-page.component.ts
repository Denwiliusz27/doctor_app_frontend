import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  options: string[] = ['lekarz', 'pacjent'];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(option: string) {
    console.log('przekierowuje do ' + option)
  }
}