import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxCaptchaModule } from 'ngx-captcha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FaqRoutes } from './faq.routing';
import { FaqComponent } from './faq.component';



@NgModule({
  imports: [FaqRoutes,CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,RouterModule, TranslateModule],
  declarations: [
    FaqComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class FaqModule {}
