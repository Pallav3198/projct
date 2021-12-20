import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ForgotService } from '../forgotpassword/forgot.service';
import { SignupService } from '../signup/signup.service';
import { ResetService } from './reset.service';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private signupService:SignupService) { }
  resetForm = new FormGroup({    
    email: new FormControl(""),
    password: new FormControl(""),
    conf_password: new FormControl("")
  })
  ngOnInit(): void {

  }
  passwordReset(){
    if(this.resetForm.value.password!=this.resetForm.value.conf_password)
    {
      alert("Passwords donot match\n Please try again");
      this.resetForm.reset();
    }
    else if(this.resetForm.value.password==this.resetForm.value.conf_password)
    {
      //update the password
      let obj = {
        "email": this.resetForm.value.email,
        "new_password": this.resetForm.value.password
      }
      // this.signupService.updateDetails(obj).subscribe
      // (
      //   (data)=>{
      //     let _email = (JSON.parse(data));
      //     //find the matching data
      //     this.signupService.getUsersByEmail(_email).subscribe
      //     (
      //       (data)=>{
      //         // we got the old password
      //         console.log(data[0].password);
      //         //now update the password
              
      //         //update record funcitonality ends
      //       }
      //     );
      //     //
      //   },
      //   (error)=>{
      //     console.log(error)
      //   }
      // );


      //**** RESET PASSWORD****/
      this.signupService.getUsersByEmail(this.resetForm.value.email)
      .subscribe(
        (data)=>{
          if(data.length==0)
          {
            alert('User Doesnot Exist in our Database');
          }
          else
          {
             let updatedObj = {
              "id": data[0].id,
              "email": data[0].email,
              "username": data[0].username,
              "password": this.resetForm.value.password
             }
            console.log(updatedObj);
            this.signupService.updateDetails(updatedObj).subscribe
            (
              (data)=>{
                console.log('Finally'+data)
                alert("Records Updated Successfully!");
              },
              (error)=>{
                console.log(error)
              }
            );
          }
        }
      )
    }
  }
}
