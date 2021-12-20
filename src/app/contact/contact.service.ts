import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  baseurl = 'http://localhost:3700'
  postData(Obj:any):Observable<any>{
    let url = this.baseurl+ '/msgEmail';
    // let header = {'content-type':'application/json'};
    return this.http.post(url,Obj);
  }
}
