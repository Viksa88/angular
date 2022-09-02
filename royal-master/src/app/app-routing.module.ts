import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';

const routes:Routes = [
  { path:'',component:LoginComponent },
  { path:'register',component:RegisterComponent},
  { path:'login',component:LoginComponent},
  { path:'dashboard',component:DashboardComponent},
  { path: 'customer',component:CustomerComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
