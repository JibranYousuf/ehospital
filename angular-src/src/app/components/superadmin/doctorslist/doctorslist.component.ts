import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-doctorslist',
  templateUrl: './doctorslist.component.html',
  styleUrls: ['./doctorslist.component.css']
})
export class DoctorslistComponent implements OnInit {
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
