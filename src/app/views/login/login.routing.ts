import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      meta: {
        title: 'login.title',
        description: 'login.text',
        override: true,
      },
    },
  },
];

export const LoginRoutes = RouterModule.forChild(routes);
