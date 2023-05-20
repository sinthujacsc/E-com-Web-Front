import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { HeaderComponent } from './header/header.component';
import { FooterV1Component } from './footer-v1/footer-v1.component';
import { CommonService } from '@shared/services/common.service';

@NgModule({
  imports: [CommonModule, RouterModule, TranslateModule],
  declarations: [FooterComponent, SidebarComponent, ToolbarComponent, WrapperComponent, HeaderComponent, FooterV1Component],
  exports: [FooterComponent, SidebarComponent, ToolbarComponent, WrapperComponent],
  providers: [
   
   
  ],
})
export class LayoutsModule {

}
