import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder} from '@angular/forms';
import { CartService } from '../shared/cart.service';
import {CartSendMailService} from './cart-send-mail.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products:any=[];
  public grandTotal!:number;
  public count=0;
  constructor(private cartService:CartService, private formBuilder:FormBuilder,private sendMailService:CartSendMailService) { }
  // public coupon_input!:string;
  deliveryForm = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("")
  })
  ngOnInit(): void {
    this.deliveryForm = this.formBuilder.group({
      name:[''],
      email:['']
    })
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products=res;
      console.log(res);
      this.products.grandTotal=this.cartService.getTotalPrice();
      // }
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  couponFn(input:string){
    let isClicked = this.count+1;
    this.count++;
    if(input=='MTX' && isClicked==1)
    {
      alert("Success! Coupon Code Applied!");
      this.products.grandTotal = 0.9*(this.products.grandTotal);
      console.log(this.products.grandTotal);
    }
    else if(isClicked>1)
    {
     alert("You have already used this coupon code!");
    }
    else
    {
      alert("Sorry! Not a Valid Coupon Code")
    }
  }
  //send Email
  sendMail(){
    let obj = {
      "name": this.deliveryForm.value.name,
      "email": this.deliveryForm.value.email
    }
    this.sendMailService.sendEmail(obj).subscribe
    (
      (data)=>{
        console.log(data);
        console.log("Mail Sent!");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  //payment gateway
  sendPayment(){
    let obj = {
      "email": this.deliveryForm.value.email,
      "amount": this.products.grandTotal
    }
    this.sendMailService.paymentSend(obj).subscribe(
      (data)=>{
        console.log(data);
        console.log('Payment Info Sent');
      },
      (error)=>console.log(error)
    );
  }
  //
}
