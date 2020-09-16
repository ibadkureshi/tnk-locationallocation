import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/new-analysis/new-analysis.module').then(
        (m) => m.NewAnalysisModule
      ),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./pages/results/results.module').then((m) => m.ResultsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
