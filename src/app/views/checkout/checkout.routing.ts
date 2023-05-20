import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: {
      meta: {
        title: 'checkout.title',
        description: 'checkout.text',
        override: true,
      },
    },
  },
];

export const CheckoutRoutes = RouterModule.forChild(routes);
