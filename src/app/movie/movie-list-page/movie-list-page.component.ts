import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
  exhaustMap,
  map,
  Observable,
  scan,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { ElementVisibilityDirective } from '../../shared/element-visibility.directive';
import { TMDBMovieModel } from '../../shared/model/movie.model';
import { MovieService } from '../movie.service';
import { MovieListComponent } from '../movie-list/movie-list.component';

@Component({
  selector: 'movie-list-page',
  template: `
    @let movieData = movies();
    @if (movieData) {
      <h1>{{ title() }}</h1>
      @defer (on viewport) {
        <movie-list [movies]="movieData" />
        <div (elementVisible)="paginate$.next()"></div>
      } @placeholder {
        <div class="loader"></div>
      }
    }
  `,
  imports: [MovieListComponent, ElementVisibilityDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
      padding: 0 25px 0 25px;
    }
  `,
})
export class MovieListPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  paginate$ = new Subject<void>();

  title = toSignal(
    this.activatedRoute.params.pipe(
      map((params) => {
        switch (params.category) {
          case 'popular':
            return 'Popular Movies';
          case 'top_rated':
            return 'Top Rated Movies';
          case 'upcoming':
            return 'Upcoming Movies';
        }
        return '';
      }),
    ),
  );

  movies = toSignal(
    this.activatedRoute.params.pipe(
      switchMap((params) => {
        return this.paginate((page) =>
          this.movieService.getMovieList(params.category, page),
        );
      }),
    ),
  );

  private paginate(paginateFn: (page: number) => Observable<TMDBMovieModel[]>) {
    return this.paginate$.pipe(
      startWith(void 0),
      exhaustMap((_, i) => {
        return paginateFn(i + 1);
      }),
      scan((allMovies, pagedMovies) => {
        return [...allMovies, ...pagedMovies];
      }, [] as TMDBMovieModel[]),
    );
  }
}
