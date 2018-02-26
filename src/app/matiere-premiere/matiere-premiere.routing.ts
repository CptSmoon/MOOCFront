import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatierePremiereModule} from "./matiere-premiere.module";

// Layouts

export const routes: Routes = [
  {
    path: 'mp',
    loadChildren: "./mp/matiere-premiere.module#MatierePremiereModule"
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatierePremiereRouting {
}
