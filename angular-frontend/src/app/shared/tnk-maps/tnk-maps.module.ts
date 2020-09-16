import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { TnkMapsComponent } from './tnk-maps.component';

@NgModule({
  declarations: [TnkMapsComponent],
  imports: [CommonModule, LeafletModule, LeafletDrawModule],
  exports: [TnkMapsComponent],
})
export class TnkMapsModule {}
