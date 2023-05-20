import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { CartRoutes } from './cart.routing';
import { CartComponent } from './cart.component';



@NgModule({
  imports: [CartRoutes,CommonModule, RouterModule, TranslateModule,
    
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    CartComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class CartModule {}
