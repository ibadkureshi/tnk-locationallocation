import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TknUploadComponent } from './tkn-upload.component';

import {
  NzUploadModule,
  NzMessageModule,
  NzButtonModule,
  NzIconModule,
} from 'ng-zorro-antd';
import { LayoutComponentsModule } from '../layout-components/layout-components.module';

@NgModule({
  declarations: [TknUploadComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzMessageModule,
    LayoutComponentsModule,
  ],
  exports: [TknUploadComponent],
})
export class TknUploadModule {}
