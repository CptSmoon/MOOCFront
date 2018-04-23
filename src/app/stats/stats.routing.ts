import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatsAchatComponent} from "./stats-achat/stats-achat.component";
import {StatsVenteComponent} from "./stats-vente/stats-vente.component";

// Layouts

export const routes: Routes = [
  {
    path: 'achats',
    component: StatsAchatComponent
  }
,
  {
    path: 'ventes',
    component: StatsVenteComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRouting {
}
