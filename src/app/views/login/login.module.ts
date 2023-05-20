import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';



@NgModule({
  imports: [LoginRoutes,CommonModule, RouterModule, TranslateModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    FormsModule],
  declarations: [
    LoginComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class LoginModule {}
