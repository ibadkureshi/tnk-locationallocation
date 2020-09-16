import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineGraphComponent } from './line-graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [LineGraphComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [LineGraphComponent],
})
export class LineGraphModule {}
