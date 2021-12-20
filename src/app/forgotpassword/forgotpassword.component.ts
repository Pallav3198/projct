import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ForgotService } from './forgot.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private forgotService:ForgotService,private loginService:LoginService) { }
  forgotForm!:FormGroup;
  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email:['']
    })
  }
  //check if the user exists
  sendMail(){
    this.loginService.getAllUsersByEmail(this.forgotForm.value.email)
    .subscribe(
      (data)=>{
        console.log(data);
        if(data.length==0)
        {
          alert("Invalid!\n User Doesnot exist in our records\n Please Recheck Your Email Id");
        }
        else if(this.forgotForm.value.email==data[0].email)
        {
          console.log("Records Found");
          alert("Please Check Your Email\n You Can reset your password from there");
          //email a link to reset password
          let obj = {"email":this.forgotForm.value.email};
          this.forgotService.postEmail(obj).subscribe
          (
            (data)=>{
              console.log(data);
              console.log("Email Sent!");
            },
            (error)=>{
              console.log("Unable to send email!");
            }
          );
        }
      }
    )
  }
  sendResetLink(){
    console.log(1);
  }
}
