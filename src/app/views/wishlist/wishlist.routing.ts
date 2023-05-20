import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: WishlistComponent,
    data: {
      meta: {
        title: 'wishlist.title',
        description: 'wishlist.text',
        override: true,
      },
    },
  },
];

export const WishlistRoutes = RouterModule.forChild(routes);
