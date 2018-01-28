import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) 
  {
    var userData = localStorage.getItem('user');
    var user = JSON.parse(userData);
    console.log(user);
    this.userType = user.userType;

  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      console.log(profile);
      this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }
}
