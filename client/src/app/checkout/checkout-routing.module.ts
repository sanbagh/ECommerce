import { CheckoutSucessComponent } from './checkout-sucess/checkout-sucess.component';
import { CheckoutComponent } from './checkout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: CheckoutComponent},
  {path: 'success', component: CheckoutSucessComponent}
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
