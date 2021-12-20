import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartSendMailService {
  public baseurl = 'http://localhost:3700';
  constructor(private http:HttpClient) { }
  //send email on successful purchase
  
  sendEmail(obj:any):Observable<any>{
    let url =   'http://localhost:3700'+'/checkoutMail';
    let header = {'content-type':'application/json'};
    return this.http.post(url,obj,{'headers':header,responseType:'text'});
  }
  paymentSend(obj:any):Observable<any>{
    let url = "http://localhost:5000/pay";
    let header = {'content-type':'application/json'};
    return this.http.post(url,obj,{'headers':header, responseType:'text'});
  }
}
