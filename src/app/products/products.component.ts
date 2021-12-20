import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import { ProductModel } from '../product-model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private router:Router,private formBuilder:FormBuilder,private api:ApiService) { }
  searchText!:any;
  productModelObj:ProductModel = new ProductModel();
  formValue!:FormGroup;
  getData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      id!:[''],
      productName!:[''],
      productType!:[''],
      sellerName!:[''],
      sellerPhone!:['']
    })
    //get all the products as soon as the component is loaded
    this.getProducts();
  }
  //ngOnInit ends here
  //clickAddProduct method hides edit button when new product is added
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  // it hides addnew product button when product is edited.
  // post products to the json server
  postProduct(){
    this.productModelObj.id = this.formValue.value.productId;
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productType= this.formValue.value.productType;
    this.productModelObj.sellerName= this.formValue.value.sellerName;
    this.productModelObj.sellerPhone = this.formValue.value.sellerPhone;
    this.api.postProuductsAPI(this.productModelObj).subscribe(res=>{
      console.log('Data Posted Successfully!');
      this.getProducts();
    })
  }
  //get products
  getProducts(){
    this.api.getProuductsAPI().subscribe((res)=>{
      this.getData = res;
    },(err)=>{
      alert("Something Went Wrong!");
    })
  }
  //delete the product from the list
  deleteProduct(product:any){
    if(confirm("Are You sure to delete this product?")){
    this.api.deleteProuductsAPI(product.id).subscribe((res)=>{
      console.log("Data Deleted Successfully");
      this.getProducts();
    },(err)=>{
      alert("Something went wrong!");
    })
  }
}
//edit the products
editProduct(row:any){
    this.showAdd=false;
    this.showUpdate=true;
  this.productModelObj.id = row.id;
  this.formValue.controls['productName'].setValue(row.productName);
  this.formValue.controls['productType'].setValue(row.productType);
  this.formValue.controls['sellerName'].setValue(row.sellerName);
  this.formValue.controls['sellerPhone'].setValue(row.sellerPhone);
}
updateProduct(){
    this.productModelObj.productName = this.formValue.value.productName;
    this.productModelObj.productType= this.formValue.value.productType;
    this.productModelObj.sellerName= this.formValue.value.sellerName;
    this.productModelObj.sellerPhone = this.formValue.value.sellerPhone;
    this.api.updateProuductsAPI(this.productModelObj,this.productModelObj.id)
     .subscribe((res)=>{
       alert("Records Updated Successfully!");
       this.getProducts();
       this.formValue.reset();
     },(err)=>{
       alert("Error! the records didnot get updated");
     })
}

}
