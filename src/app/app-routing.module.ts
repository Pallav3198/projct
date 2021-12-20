import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthGuard } from './auth.guard';
import { ResetComponent } from './reset/reset.component';
import { PostpaymentComponent } from './postpayment/postpayment.component';
const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  // {path:'products',component:ProductsComponent,canActivate:[AdminGuardGuard]},
  {path:'products',component:ProductDetailsComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'products/cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'reset',component:ResetComponent},
  {path:'success',component:PostpaymentComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AboutComponent,
  ContactComponent,
  HomeComponent,
  ProductsComponent,
  LoginComponent,
  SignupComponent,
  // ProductDetailsComponent,
  CartComponent,
  ForgotpasswordComponent,
  ResetComponent,
  PageNotFoundComponent
];
