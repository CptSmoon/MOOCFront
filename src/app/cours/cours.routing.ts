import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListCoursComponent} from "./list-cours/list-cours.component";
import {AddCoursComponent} from "./add-cours/add-cours.component";

// Layouts

export const routes: Routes = [
  {
    path: 'list',
    component: ListCoursComponent
  },
  {
    path: 'add',
    component: AddCoursComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursRouting {
}
