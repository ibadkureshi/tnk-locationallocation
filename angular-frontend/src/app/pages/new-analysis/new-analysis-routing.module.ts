import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAnalysisComponent } from './new-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: NewAnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewAnalysisRoutingModule {}
