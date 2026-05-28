import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        '@test-task-insilicobiotech/shared/layout/main-layout/feature'
      ).then((m) => m.SharedLayoutMainLayoutFeature),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
