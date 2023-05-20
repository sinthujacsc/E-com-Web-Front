import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      meta: {
        title: 'about.title',
        description: 'about.text',
        override: true,
      },
    },
  },
];

export const AboutRoutes = RouterModule.forChild(routes);
