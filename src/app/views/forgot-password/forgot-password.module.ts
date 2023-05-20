import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ForgotPasswordRoutes } from './forgot-password.routing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [ForgotPasswordRoutes,CommonModule, RouterModule, TranslateModule,
    
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class ForgotPasswordModule {}
