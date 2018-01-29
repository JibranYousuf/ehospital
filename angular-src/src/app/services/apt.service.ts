import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { $ } from 'protractor';
import { get } from 'http';

 
@Injectable()
export class AptService {
  apppointment: any;
  url = "http://localhost:3000/appointments/";
  _id: any;
  
  constructor( private http: Http,
  ) { }


  createApt(appointment){
    let headers = new Headers();
    console.log(appointment, "appointment created")
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/appointments/register', appointment, {headers: headers})
    .map(res => res.json());
  }

  updateAppointment(url, data) {
    let headers = new Headers();
    console.log(data, "data")
    return this.http.put(this.url+url, data, {headers: headers}).
      map((data : any) => {
        return data._body.json();
        // console.log(data.json(),"json data in edit");
        // return data.json()
      })
  }
  deleteAppointment(_id){
    let headers = new Headers();
    return this.http.delete(this.url+'delete/'+_id)
}

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  
  getAppointment(_id){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.url+'getAppointment/?_id='+_id, {headers: headers})
    .map(function (res) { return res.json(); }
    )}
  


  getAllAppointments(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/appointments/getall', {headers: headers})
    .map(function (res) { return res.json(); }
  );
}

}
