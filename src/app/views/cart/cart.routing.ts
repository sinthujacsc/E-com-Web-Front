import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      meta: {
        title: 'cart.title',
        description: 'cart.text',
        override: true,
      },
    },
  },
];

export const CartRoutes = RouterModule.forChild(routes);
