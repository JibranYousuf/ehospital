import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {
  name : String;
  username: String;
  email: String;
  password: String;
  userType: String;
  user: any;
  _id:'5a3aaa1da685361dccddbbad';
  constructor( 
    private validateService: ValidateService, 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    
  )
  
  { }

  ngOnInit() {
    
  }


  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      userType: this.userType,
    }
     
  // Required Fields
  if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('Please Fill in all fields', {cssClass: 'alert-danger', timeout: 3000})
    return false;
  }
  
  // Validate Email
  if(!this.validateService.validateEmail(user.email)){
    this.flashMessage.show('Please use valid email', {cssClass: 'alert-danger', timeout: 3000})
    return false;
  }
  
  // Register User
  this.authService.registerUser(user).subscribe(data =>{
    if(data.success){
      this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000})    
      this.router.navigate(['/superadmin']);
    } else{
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000})    
      this.router.navigate(['/register']);
    }
  });


  }
  OnDeleteUser(_id){
    this.authService.deleteUser(_id).subscribe(data=> {
      console.log(data,"data from db")
      this.user();
    },
    err => {
      console.error(err, "error" )
    }
  )};

}    

