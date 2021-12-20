import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postpayment',
  template: `
    <div class="container-fluid">
     <h2> Payment Successful! </h2>
     <i class="fas fa-check-circle"></i>
    </div>
  `,
  styles: [
    ` 
    .container-fluid{
      background-color: antiquewhite;
      width: 100%;
      text-align:center;
      color: green;
      font-size: 100px;
      height: 80vh;
      display:flex;
      flex-direction: column;
      justify-content:center;
    }
    `
  ]
})
export class PostpaymentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
