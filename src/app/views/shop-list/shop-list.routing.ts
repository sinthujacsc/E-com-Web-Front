import { Routes, RouterModule } from '@angular/router';
import { ShopListComponent } from './shop-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShopListComponent,
    data: {
      meta: {
        title: 'shop-list.title',
        description: 'shop-list.text',
        override: true,
      },
    },
  },
];

export const ShopListRoutes = RouterModule.forChild(routes);
