import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { MyprofileRoutes } from './myprofile.routing';
import { MyprofileComponent } from './myprofile.component';



@NgModule({
  imports: [MyprofileRoutes,CommonModule, RouterModule, TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
  
    MyprofileComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class MyprofileModule {}
