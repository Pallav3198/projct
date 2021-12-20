import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  constructor(private loginService:LoginService,private formBuilder:FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
  
    //user login
    Login(){
      this.loginService.getAllUsersByEmail(this.loginForm.value.email).subscribe(
        (data)=>{
          //check if the user is valid
          console.log(data);
          if(data.length==0)
          { 
            alert("Not a Valid User!\nPlease Register first");
            console.log('Not a Valid User!');
          }
          else if(this.loginForm.value.password!=data[0].password)
           {
             console.log('Your Password is Incorrect!');
             alert("Password Incorrect!\nPlease Re enter your password");
             this.loginForm.reset();
           }
          else if(this.loginForm.value.password==data[0].password)
           {
             console.log("Login Successful!");
             //authentication
             localStorage.setItem('token',data[0].email);
              //
             this.loginForm.reset();
             this.router.navigate(['products']);
           }
        },
        (error)=>console.log(error)
      )
    }
}