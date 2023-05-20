import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { MyprofileComponent } from '../myprofile/myprofile.component';
import { MyOrderComponent } from './my-order.component';
import { MyorderRoutes } from './my-order.routing';



@NgModule({
  imports: [MyorderRoutes,CommonModule, RouterModule, TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
  
    MyOrderComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class MyorderModule {}
