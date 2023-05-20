import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailRoutes } from './product-detail.routing';
import { ProductDetailComponent } from './product-detail.component';



@NgModule({
  imports: [ProductDetailRoutes,CommonModule, RouterModule, TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
  
    ProductDetailComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class ProductDetailModule {}
