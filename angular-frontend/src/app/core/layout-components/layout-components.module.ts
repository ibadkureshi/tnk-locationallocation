import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NzLayoutModule,
  NzGridModule,
  NzButtonModule,
  NzIconModule,
  NzSelectModule,
  NzFormModule,
  NzInputModule,
  NzCheckboxModule,
  NzInputNumberModule,
  NzSpinModule,
} from 'ng-zorro-antd';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    NzLayoutModule,
    NzGridModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzIconModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzInputNumberModule,
    NzSpinModule,
    NzCheckboxModule,
    NzToolTipModule,
  ],
})
export class LayoutComponentsModule {}
