import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userType;
  constructor() {
    var userData = localStorage.getItem('user');
    var user= JSON.parse(userData);
    console.log(user);
    this.userType=user.userType;
    
  }
  
  ngOnInit() {
  }

}
