import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {
      meta: {
        title: 'contact.title',
        description: 'contact.text',
        override: true,
      },
    },
  },
];

export const ContactRoutes = RouterModule.forChild(routes);
