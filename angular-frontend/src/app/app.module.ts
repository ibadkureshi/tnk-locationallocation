import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CoreModule } from './core/core.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LayoutComponentsModule } from './core/layout-components/layout-components.module';
import { IconsProviderModule } from './icons-provider.module';
import { LicencePageComponent } from './shared/licence-page/licence-page.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LicenceGuard } from './services/guards/licence-guard';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, LicencePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    LeafletModule,
    LeafletDrawModule,
    NzButtonModule,
    LayoutComponentsModule,
    IconsProviderModule,
    NzCheckboxModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, LicenceGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
