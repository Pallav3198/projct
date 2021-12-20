import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupform !: FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private signupService:SignupService) { }
  ngOnInit(): void {
    this.signupform = this.formBuilder.group({
      // id:[''],
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]]
    })
  }
  signup(){
    // console.log(this.signupform.value);
    let userObj = {
      "email": this.signupform.value.email,
      "username": this.signupform.value.username,
      "password": this.signupform.value.password
    }
    this.signupService.insertUser(JSON.stringify(userObj)).subscribe(
      (data)=>{
        console.log(data);
        alert("SignUp Successful!");
        //check if the user already exists or not
        this.signupService.getUsersByEmail(JSON.parse(data).email)
        .subscribe(
          (res)=>{
            console.log(`%%%%%%%${JSON.stringify(res.email)}`)
          },
          (err)=>console.log(err)
          )
        //authentication for login-logout
        let _token = JSON.parse(data).email;
        console.log('The Token is '+_token);
        localStorage.setItem('token', _token)
        //*****SEND EMAIL STARTS*******/
        let obj = data;
        console.log(obj);
        this.signupService.sendEmail(obj).subscribe(
          (data)=>{console.log(data)
          console.log('Email Sent')
        },
        (error)=>console.log(error)
        );
        /*******SEND EMAIL ENDS********/
      },
      (err)=>console.log(err)
    );
    this.signupform.reset();
    this.router.navigate(['login']);
//send email-> Welcome User
  }
  
  /* */
  get username(){
    return this.signupform.get('username');
  }
  get email(){
    return this.signupform.get('email');
  }
  get password(){
    return this.signupform.get('password');
  }

}
