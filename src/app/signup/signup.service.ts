import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactService } from '../contact/contact.service';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient, private contactService:ContactService) { }
  private baseurl:string = 'http://localhost:3000';
  getAllUsers():Observable<any>
  {
    let url = this.baseurl+'/allusers';
    return this.http.get(url);
  }
  insertUser(userObj:Object):Observable<any>{
    let url = this.baseurl +'/insertUser';
    let header = {'content-type':'application/json'};
    return this.http.post(url,userObj,{'headers':header,responseType:'text'});
  }
  getUsersByEmail(email:string):Observable<any>
  {
    let url = this.baseurl+'/usersByEmail/'+ email;
    return this.http.get(url);
  }
  sendEmail(userObj:Object):Observable<any>{
    let url = "http://localhost:3700/newaccountMail";
    let header = {'content-type':'application/json'};
    return this.http.post(url,userObj,{'headers':header,responseType:'text'});
  }

  //update details
  updateDetails(obj:any){
    let url = 'http://localhost:3000/updateUser';
    let header = {
      'content-type':'application/json'
    };
    return this.http.put(url,obj,{'headers':header,responseType:'text'});
  }
}

