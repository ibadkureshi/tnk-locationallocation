import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponentsModule } from './layout-components/layout-components.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, LayoutComponentsModule, RouterModule],
  exports: [HeaderComponent, LayoutComponentsModule],
})
export class CoreModule {}
