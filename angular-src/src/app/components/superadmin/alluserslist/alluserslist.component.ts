import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-alluserslist',
  templateUrl: './alluserslist.component.html',
  styleUrls: ['./alluserslist.component.css']
})
export class AlluserslistComponent implements OnInit {
  data: Array<any> = [];
  editItemsForm: boolean = false;
  user: any;
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
