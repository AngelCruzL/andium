import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(r => r.AuthRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/global-feed/global-feed.routes').then(
        r => r.globalFeedRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
