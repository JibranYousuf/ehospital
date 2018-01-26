import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AptService } from '../../../services/apt.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  user:any;
  appointment: any;
  data: Array<any> = [];
  editItemsForm: boolean = false;
  name : String;
  drname: String;
  aptname: String;
  aptDateCreated: any;
  aptDate: any;
  aptStatus: String;
  aptType: String;
  contactnum: String;

  constructor(
    private authService:AuthService,
    private aptService:AptService,
    private router:Router
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
    this.aptService.getAllAppointments().subscribe((data) => {
      console.log(data);
      this.data = data.getAppointmentData;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  onAppointmentSubmit(){
    const appointment = {
      name: this.name,
      drname: this.drname,
      aptStatus: this.aptStatus,
      aptType: this.aptType,
      aptDateCreated: this.aptDateCreated,
      aptDate: this.aptDate,
      contactnum: this.contactnum,
    }
    this.aptService.createApt(appointment).subscribe(data =>{
      if(data.success){ 
        this.router.navigate(['/dashboard']);
      } else{    
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onUpdateUser(user){     
    console.log(user, "_id")
    var url = "update" + "/" + user._id
    this.authService.updateUser(url, user).subscribe(
      (data) => {
        console.log(data, "fgdfg");
        this.data = data.getData;
        this.authService.getUser(user.username);
        this.editItemsForm = false;
        
      },
      (err) => {
        return err
      }
    )
  }
  OnDeleteUser(_id, i: number){
    this.authService.deleteUser(_id).subscribe(data=> {
      this.data.splice(i, 1)
      console.log(data,"data from db")
    },
    err => {
      console.error(err, "error" )
    }
  )};
}
