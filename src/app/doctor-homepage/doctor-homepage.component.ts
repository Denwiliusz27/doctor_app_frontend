import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-doctor-homepage',
  templateUrl: './doctor-homepage.component.html',
  styleUrls: ['./doctor-homepage.component.css']
})
export class DoctorHomepageComponent implements OnInit {

  @Output() public menuToggle = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSidenav() {
    this.menuToggle.emit();
  }
}
