import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAnalysisRoutingModule } from './new-analysis-routing.module';
import { NewAnalysisComponent } from './new-analysis.component';
import { TnkMapsModule } from 'src/app/shared/tnk-maps/tnk-maps.module';
import { TknUploadModule } from 'src/app/core/tkn-upload/tkn-upload.module';
import { LayoutComponentsModule } from 'src/app/core/layout-components/layout-components.module';
import { CoreModule } from 'src/app/core/core.module';
import { LoadingModule } from 'src/app/shared/loading/loading.module';

@NgModule({
  declarations: [NewAnalysisComponent],
  imports: [
    CommonModule,
    NewAnalysisRoutingModule,
    TnkMapsModule,
    TknUploadModule,
    LayoutComponentsModule,
    CoreModule,
    LoadingModule,
  ],
})
export class NewAnalysisModule {}
