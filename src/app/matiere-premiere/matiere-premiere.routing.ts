import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatierePremiereModule} from "./matiere-premiere.module";
import {StockMpComponent} from "./stock-mp/stock-mp.component";

// Layouts

export const routes: Routes = [
  {
    path: 'stock',
    component: StockMpComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatierePremiereRouting {
}
