import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postProuductsAPI(data:any){
    return this.http.post("http://localhost:3000/products/",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getProuductsAPI(){
    return this.http.get("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateProuductsAPI(data:any, id:number){
    return this.http.put("http://localhost:3000/products/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteProuductsAPI(id:number){
    return this.http.delete("http://localhost:3000/products/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  /* DATABASE*/
  baseurl:string="http://localhost:3500";
  getProducts():Observable<any>{
    let url = this.baseurl+'/allProducts';
    return this.http.get(url);
  }
}
