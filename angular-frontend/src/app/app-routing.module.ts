import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenceGuard } from './services/guards/licence-guard';
import { LicencePageComponent } from './shared/licence-page/licence-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [LicenceGuard],
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/new-analysis/new-analysis.module').then(
        (m) => m.NewAnalysisModule
      ),
    canActivate: [LicenceGuard],
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./pages/results/results.module').then((m) => m.ResultsModule),
    canActivate: [LicenceGuard],
  },
  {
    path: 'licence',
    component: LicencePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
