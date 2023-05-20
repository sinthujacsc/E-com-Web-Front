import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '@shared/services/common.service';
import { ToastrModule } from 'ngx-toastr';
import { WishlistRoutes } from './wishlist.routing';
import { WishlistComponent } from './wishlist.component';



@NgModule({
  imports: [WishlistRoutes,CommonModule, RouterModule, TranslateModule,
    
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    WishlistComponent
  ],
  exports: [],
  providers: [
    CommonService
  ],
})
export class WishlistModule {}
