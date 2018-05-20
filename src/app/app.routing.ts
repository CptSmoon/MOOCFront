import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './full-layout/full-layout.component';


export const routes: Routes = [

  {
    path: '',
    component: FullLayoutComponent,
    children: [

    {
      path: 'cours',
      loadChildren: './cours/cours.module#CoursModule'
    }
  ],
    /*canActivate: [
     CanActivateViaAuthGuard
     ]*/
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
