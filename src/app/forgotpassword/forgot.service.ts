import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  constructor(private http:HttpClient,private loginService:LoginService) { }
  public baseUrl = 'http://localhost:3700'
  //post email if the user exists
  postEmail(obj:Object):Observable<any>{
    let url = this.baseUrl+ '/resetPassword';
    let header = {'content-type':'application/json'};
    return this.http.post(url,obj,{'headers':header,responseType:'text'})
  };
}
