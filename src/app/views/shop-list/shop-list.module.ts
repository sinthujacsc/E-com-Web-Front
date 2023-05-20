import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ShopListRoutes } from './shop-list.routing';
import { ShopListComponent } from './shop-list.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  imports: [ShopListRoutes,CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgxPaginationModule,
    FormsModule,RouterModule, TranslateModule],
  declarations: [
    ShopListComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class ShopListModule {}
