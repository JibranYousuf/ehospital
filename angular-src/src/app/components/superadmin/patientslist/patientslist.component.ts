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
  patientData: Array<any> = [];
  
  constructor(
    private authService:AuthService,
    private router:Router)
   {
    }
  

    ngOnInit() {
      this.authService.getAllPatient().subscribe((patientdata) => {
        console.log(patientdata);
        this.patientData = patientdata.getPatientData;
      },
      err => {
        console.log(err);
        return false;
      });
    }
}
