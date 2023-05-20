import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    data: {
      meta: {
        title: 'forgot-password.title',
        description: 'forgot-password.text',
        override: true,
      },
    },
  },
];

export const ForgotPasswordRoutes = RouterModule.forChild(routes);
