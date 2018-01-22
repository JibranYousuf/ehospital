import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patientslist',
  templateUrl: './patientslist.component.html',
  styleUrls: ['./patientslist.component.css']
})
export class PatientslistComponent implements OnInit {

  data: Array<any> = [];
  constructor(
    private authService:AuthService,
    private router:Router)
   {
    }
  

    ngOnInit() {
      this.authService.getAllProfile().subscribe((data) => {
        console.log(data);
        this.data = data.getData;
      },
      err => {
        console.log(err);
        return false;
      });
    }
}
