import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-doctor-homepage',
  templateUrl: './doctor-homepage.component.html',
  styleUrls: ['./doctor-homepage.component.css']
})
export class DoctorHomepageComponent implements OnInit {
  options: string[] = ['kalendarz', 'wizyty', 'wyniki'];
  opened = false;

  @Output() public menuToggle = new EventEmitter();
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onToggleSidenav(): void {
    this.sidenav.close();
  }

  redirect(option: string): void {
    if (option === 'kalendarz') {
      this.router.navigateByUrl('/doktor-kalendarz');
    }
    else if (option === 'wizyty') {
      this.router.navigateByUrl('/doktor-strona-główna');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/doktor-strona-główna');
    }
    console.log('przekierowuje do ' + option);
  }
}
