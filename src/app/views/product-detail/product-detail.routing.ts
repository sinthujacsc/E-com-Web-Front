import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent,
    data: {
      meta: {
        title: 'product-detail.title',
        description: 'product-detail.text',
        override: true,
      },
    },
  },
];

export const ProductDetailRoutes = RouterModule.forChild(routes);
