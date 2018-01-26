import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:any;
  data: Array<any> = [];
  editItemsForm: boolean = false;
  name : String;
  username: String;
  email: String;
  password: String;
  userType: String;
  dob: String;
  contactnum: number;
  age: number;
  gender: String;
  _id: any;
  aptname: any;

  constructor(
    private authService:AuthService,
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
