import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-adminslist',
  templateUrl: './adminslist.component.html',
  styleUrls: ['./adminslist.component.css']
})


export class AdminslistComponent implements OnInit {
  adminData: Array<any> = [];
  
  constructor(
    private authService:AuthService,
    private router:Router)
   {
    }

  ngOnInit() {
    this.authService.getAllAdmin().subscribe((admindata) => {
      console.log(admindata);
      this.adminData = admindata.getAdminData;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
