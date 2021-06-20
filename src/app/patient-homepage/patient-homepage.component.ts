import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-homepage',
  templateUrl: './patient-homepage.component.html',
  styleUrls: ['./patient-homepage.component.css']
})
export class PatientHomepageComponent implements OnInit {
  cities: string[] = ['Kraków', 'Warszawa', 'Gdańsk'];

  constructor() { }

  ngOnInit(): void {
  }

}
