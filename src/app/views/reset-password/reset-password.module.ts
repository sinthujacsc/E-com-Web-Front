import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ResetPasswordRoutes } from './reset-password.routing';
import { ResetPasswordComponent } from './reset-password.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [ResetPasswordRoutes,CommonModule, RouterModule, TranslateModule,
    
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    ResetPasswordComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class ResetPasswordModule {}
