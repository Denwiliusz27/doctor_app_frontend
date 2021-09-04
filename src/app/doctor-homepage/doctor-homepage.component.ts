import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../auth/auth.service';
import {DoctorService} from '../services/doctor.service';
import {Doctor} from '../model/user/user';

@Component({
  selector: 'app-doctor-homepage',
  templateUrl: './doctor-homepage.component.html',
  styleUrls: ['./doctor-homepage.component.css']
})
export class DoctorHomepageComponent implements OnInit {
  options: string[] = ['kalendarz', 'wizyty', 'pacjenci'];
  opened = false;
  user = this.authService.user;
  specialization: string;
  logoutStatus = false;

  @Output() public menuToggle = new EventEmitter();
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(private router: Router, private authService: AuthService, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctorService.getDoctorByUserId(this.user.userId).subscribe(res => {
      this.specialization = res.specialization.name;
      console.log(this.specialization);
    });
  }

  onToggleSidenav(): void {
    this.sidenav.close();
  }

  /*
  Przekierwuje na właściwą stronę powiązaną z wybraną opcją
   */
  redirect(option: string): void {
    if (option === 'kalendarz') {
      this.router.navigateByUrl('/doktor-kalendarz');
    }
    else if (option === 'wizyty') {
      this.router.navigateByUrl('/doktor-wizyty');
    } else if (option === 'pacjenci') {
      this.router.navigateByUrl('/doktor-pacjenci');
    }
    console.log('przekierowuje do ' + option);
  }

  logout() {
    this.logoutStatus = true;
    this.authService.logout();
  }
}
