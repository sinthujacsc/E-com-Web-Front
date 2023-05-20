import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContactComponent } from './contact.component';
import { ContactRoutes } from './contact.routing';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';



@NgModule({
  imports: [ContactRoutes,CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,RouterModule, TranslateModule],
  declarations: [
    ContactComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class ContactModule {}
