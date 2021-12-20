import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private baseurl = "http://localhost:3000";
  getAllUsers():Observable<any>{
    let url = this.baseurl+'/allusers';
    return this.http.get(url);
  }
  getAllUsersByEmail(email:string):Observable<any>{
    let _email = email;
    let url = this.baseurl+'/usersByEmail/'+ _email;
    return this.http.get(url);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
  }
}
