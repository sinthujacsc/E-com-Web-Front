import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { HomeRoutes } from './home.routing';
import { HomeComponent } from './home.component';



@NgModule({
  imports: [HomeRoutes,CommonModule, RouterModule, TranslateModule,
    
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    HomeComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class HomeModule {}
