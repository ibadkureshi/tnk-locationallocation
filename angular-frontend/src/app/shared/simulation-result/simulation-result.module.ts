import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationResultComponent } from './simulation-result.component';
import { LayoutComponentsModule } from 'src/app/core/layout-components/layout-components.module';
import { SimulationMetaComponent } from './simulation-meta/simulation-meta.component';
import { TnkMapsModule } from '../tnk-maps/tnk-maps.module';
import { LineGraphModule } from '../line-graph/line-graph.module';

@NgModule({
  declarations: [SimulationResultComponent, SimulationMetaComponent],
  imports: [
    CommonModule,
    LayoutComponentsModule,
    TnkMapsModule,
    LineGraphModule,
  ],
  exports: [SimulationResultComponent, SimulationMetaComponent],
})
export class SimulationResultModule {}
