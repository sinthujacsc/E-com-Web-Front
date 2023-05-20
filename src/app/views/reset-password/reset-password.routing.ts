import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    data: {
      meta: {
        title: 'reset-password.title',
        description: 'reset-password.text',
        override: true,
      },
    },
  },
];

export const ResetPasswordRoutes = RouterModule.forChild(routes);
