import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
user:any;
  constructor(
    private authService:AuthService
  ) { }

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
