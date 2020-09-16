import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { TnkMapsModule } from 'src/app/shared/tnk-maps/tnk-maps.module';
import { LayoutComponentsModule } from 'src/app/core/layout-components/layout-components.module';
import { CoreModule } from 'src/app/core/core.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';
import { SimulationResultModule } from 'src/app/shared/simulation-result/simulation-result.module';

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    TnkMapsModule,
    LayoutComponentsModule,
    CoreModule,
    LoadingModule,
    SimulationResultModule,
  ],
})
export class ResultsModule {}
