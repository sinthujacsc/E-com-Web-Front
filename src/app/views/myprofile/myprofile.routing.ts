import { Routes, RouterModule } from '@angular/router';
import { MyprofileComponent } from './myprofile.component';

const routes: Routes = [
  {
    path: '',
    component: MyprofileComponent,
    data: {
      meta: {
        title: 'myprofile.title',
        description: 'myprofile.text',
        override: true,
      },
    },
  },
];

export const MyprofileRoutes = RouterModule.forChild(routes);
