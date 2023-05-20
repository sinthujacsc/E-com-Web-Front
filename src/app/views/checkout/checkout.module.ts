import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutes } from './checkout.routing';
import { TextMaskModule } from 'angular2-text-mask';




@NgModule({
  imports: [CheckoutRoutes,CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,RouterModule,TextMaskModule, TranslateModule],
  declarations: [
    CheckoutComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class CheckoutModule {}
