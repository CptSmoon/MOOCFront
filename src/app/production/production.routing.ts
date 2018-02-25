import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Layouts

export const routes: Routes = [
  {
    path: 'recipient',
    loadChildren: "./recipient/recipient.module#RecipientModule"
  }
    /*canActivate: [
     CanActivateViaAuthGuard
     ]*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRouting {
}
