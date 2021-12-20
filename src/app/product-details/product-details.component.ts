import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,ParamMap} from '@angular/router';
import { ApiService } from '../shared/api.service';
import { CartService } from '../shared/cart.service';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router, private api:ApiService,private cartService:CartService,public loginService:LoginService) { }
  productId:any;
  public totalItem:number=0;
  public productList:any=[]; // api
  public grandTotal:number=0;
  public searchText!:any;
  ngOnInit(){
    // Database
    this.getAllProductsDB();

    this.cartService.getProducts().subscribe((res)=>{
      this.totalItem=res.length;
    })
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);
  }
  // methods from Database
  public productListDB:any;
  getAllProductsDB()
  {
    this.api.getProducts().subscribe(
      (data)=>{
        this.productListDB = data;
        this.productList = data;
        console.log(this.productList)
        //assign quantity and total
        this.productList.forEach((a:any)=>{
          Object.assign(a,{quantity:1,total:a.price});
        });
      },
      (err)=>console.log(err)
    )
  }

  //filter text
  filter(){
    console.log(this.searchText);
  }
}
