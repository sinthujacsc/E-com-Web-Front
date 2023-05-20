import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
 
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'contact', loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'faq', loadChildren: () => import('./views/faq/faq.module').then(m => m.FaqModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'forgot-password', loadChildren: () => import('./views/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'reset-password/:code', loadChildren: () => import('./views/reset-password/reset-password.module').then(m => m.ResetPasswordModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'myprofile', loadChildren: () => import('./views/myprofile/myprofile.module').then(m => m.MyprofileModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'myorder', loadChildren: () => import('./views/my-order/my-order.module').then(m => m.MyorderModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'about', loadChildren: () => import('./views/about/about.module').then(m => m.AboutModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'shop-list/:code', loadChildren: () => import('./views/shop-list/shop-list.module').then(m => m.ShopListModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'cart', loadChildren: () => import('./views/cart/cart.module').then(m => m.CartModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'checkout', loadChildren: () => import('./views/checkout/checkout.module').then(m => m.CheckoutModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'wishlist', loadChildren: () => import('./views/wishlist/wishlist.module').then(m => m.WishlistModule) }],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{ path: 'product-detail/:code', loadChildren: () => import('./views/product-detail/product-detail.module').then(m => m.ProductDetailModule) }],
  },
  
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
