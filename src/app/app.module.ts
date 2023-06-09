// angular
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { CookieModule } from '@gorniv/ngx-universal';
import { TransferHttpCacheModule } from '@nguniversal/common';
// shared
import { SharedModule } from '@shared/shared.module';
import { TranslatesService } from '@shared/translates';
import { AuthService } from '@shared/services/auth.service';
// components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { UniversalStorage } from '@shared/storage/universal.storage';
// interceptors
import { TokenInterceptor } from '@shared/interceptors/token.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonService } from '@shared/services/common.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductDetailComponent } from './views/product-detail/product-detail.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MyOrderComponent } from './views/my-order/my-order.component';

export function initLanguage(translateService: TranslatesService): Function {
  return (): Promise<any> => translateService.initLanguage();
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule,
    // 
    AppRoutes,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    SharedModule.forRoot(),
    ToastrModule.forRoot(),
    TextMaskModule
    
  ],
  declarations: [AppComponent],
  providers: [
    // CookieService,
    CookieService,
    UniversalStorage,
    AuthService,
    ToastrService,
    CommonService,
    // Guards
    AuthGuard,
    UnAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initLanguage, multi: true, deps: [TranslatesService] },
  ],
})
export class AppModule {
}
