import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ContactService } from './contact.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactService,private formBuilder:FormBuilder) { }
  contactForm = new FormGroup({
    name: new FormControl("",[Validators.required,]),
    email: new FormControl("",[Validators.required,Validators.email]),
    textarea: new FormControl("")
  })
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:[''],
      email:[''],
      textarea:['']
    })
  }

  get name(){
    return this.contactForm.get('name');
    
  }
  get email(){
    return this.contactForm.get('email');
  }
  get msg(){
    return this.contactForm.get('textarea');
  }
  postData(){
    let Obj ={
      "name": this.contactForm.value.name,
      "email": this.contactForm.value.email,
      "textarea":this.contactForm.value.textarea
    }
    this.contactService.postData(Obj).subscribe
    (
      (data)=>{
        console.log("The Data is"+ data)
      },
      (error)=>console.log(error)
    );
  
  }
  checkEmail(){
    let _email = this.contactForm.value.email;
    if(_email=="")
    {
      alert("Email Cannot be Empty!");
    }
    else if(_email)
    {
      if(this.isEmail(_email))
      {
        console.log('Valid Email');
      }
      else
      {
        alert('Invalid Email!')
      }
    }
  }
  //regex check for email
  regexp!:any;
  isEmail(mail:string):boolean
    {
        let  serchfind:boolean;

        this.regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = this.regexp.test(mail);
        console.log(serchfind)
        return serchfind
    }
}

/*


 */