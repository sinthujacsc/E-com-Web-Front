import { Routes, RouterModule } from '@angular/router';
import { MyOrderComponent } from './my-order.component';

const routes: Routes = [
  {
    path: '',
    component: MyOrderComponent,
    data: {
      meta: {
        title: 'myorder.title',
        description: 'myorder.text',
        override: true,
      },
    },
  },
];

export const MyorderRoutes = RouterModule.forChild(routes);
