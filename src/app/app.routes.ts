import { Routes } from '@angular/router';

import { MovieListPageComponent } from './movie/movie-list-page/movie-list-page.component';

export const routes: Routes = [
  {
    path: 'list/:category',
    component: MovieListPageComponent,
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./movie/movie-detail-page/movie-detail-page.component').then(
        (m) => m.MovieDetailPageComponent,
      ),
  },
  {
    path: 'search/:query',
    loadComponent: () =>
      import('./movie/movie-search-page/movie-search-page.component').then(
        (m) => m.MovieSearchPageComponent,
      ),
  },
  {
    path: '',
    redirectTo: 'list/popular',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
