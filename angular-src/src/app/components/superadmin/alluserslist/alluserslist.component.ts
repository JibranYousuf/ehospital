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
    updateUser(user) {
      console.log(user, "_id")
      var url = "update" + "/" + user._id
      this.authService.UpdateUser(url, user).subscribe(
        (data) => {
          console.log(data, "fgdfg");
          this.data = data.getData;
          this.authService.getProfile();
          this.editItemsForm = false;
        },
        (err) => {
          return err
        }
      )
    }
}
