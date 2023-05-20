import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AboutRoutes } from './about.routing';
import { AboutComponent } from './about.component';



@NgModule({
  imports: [AboutRoutes,CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule,RouterModule, TranslateModule],
  declarations: [
    AboutComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class AboutModule {}
