import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { $ } from 'protractor';
import { get } from 'http';

 
@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  url = "http://localhost:3000/users/";
  _id: any;
  
  constructor( private http: Http,
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

  updateUser(url, data) {
    let headers = new Headers();
    console.log(data, "data")
    return this.http.put(this.url+url, data, {headers: headers}).
      map((data : any) => {
        return data._body.json();
        // console.log(data.json(),"json data in edit");
        // return data.json()
      })
  }
  deleteUser(_id){
    let headers = new Headers();
    return this.http.delete(this.url+'delete/'+_id)
}

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
    .map(function (res) { return res.json(); }
  )
  }
  getUser(username){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(this.url+'getUser/?username='+username, {headers: headers})
    .map(function (res) { return res.json(); }
    )}
  
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
 
    const token = localStorage.getItem('id_token');
    this.authToken = token; 
  }
  
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getAllProfile(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/getall', {headers: headers})
    
    .map(function (res) { return res.json(); }
  );
}
getAllDoc(){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/users/getdoc', {headers: headers})
  
  .map(function (res) { return res.json(); }
);
}
getAllPatient(){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/users/getpatient', {headers: headers})
  
  .map(function (res) { return res.json(); }
);
}
getAllAdmin(){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/users/getadmin', {headers: headers})
  
  .map(function (res) { return res.json(); }
);
}
}
