import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctor-homepage',
  templateUrl: './doctor-homepage.component.html',
  styleUrls: ['./doctor-homepage.component.css']
})
export class DoctorHomepageComponent implements OnInit {
  options: string[] = ['kalendarz', 'wizyty', 'wyniki'];

  @Output() public menuToggle = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onToggleSidenav(): void {
    this.menuToggle.emit();
  }

  redirect(option: string): void {
    if (option === 'kalendarz') {
      this.router.navigateByUrl('/doktor-strona-główna');
    }
    else if (option === 'wizyty') {
      this.router.navigateByUrl('/doktor-strona-główna');
    } else if (option === 'wyniki') {
      this.router.navigateByUrl('/doktor-strona-główna');
    }
    console.log('przekierowuje do ' + option);
  }
}
