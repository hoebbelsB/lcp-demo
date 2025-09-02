import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TMDBMovieModel } from '../../shared/model/movie.model';
import { StarRatingComponent } from '../../ui/pattern/star-rating/star-rating.component';
import { MovieImagePipe } from '../movie-image.pipe';

@Component({
  selector: 'movie-card',
  imports: [StarRatingComponent, UpperCasePipe, MovieImagePipe],
  template: `
    <div class="movie-card">
      <img
        class="movie-image"
        [alt]="movie().title"
        [width]="2"
        [height]="3"
        loading="lazy"
        [src]="movie().poster_path | movieImage: 780"
      />
      <div class="movie-card-content">
        <div class="movie-card-title">{{ movie().title | uppercase }}</div>
        <div class="movie-card-rating">
          <ui-star-rating [rating]="movie().vote_average" />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .movie-card {
      transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
      transform-origin: bottom;
    }

    :host:hover {
      .movie-card {
        .movie-image {
          transform: scale(1);
          font-size: 20px;
        }

        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.6);
      }
    }

    .movie-image {
      display: block;
      width: 100%;
      height: auto;
      transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
      transform: scale(0.97);
      object-fit: cover;
    }
    @media (max-width: 500px) {
      .movie-image {
        max-height: 300px;
      }
    }
    @media (max-width: 420px) {
      .movie-image {
        max-height: 220px;
      }
    }

    .movie-card-content {
      text-align: center;
      padding: 1.5rem 3rem;
      font-size: 1.5rem;
    }

    .movie-card-title {
      font-size: 2rem;
    }
  `,
})
export class MovieCardComponent {
  index = input.required<number>();

  movie = input.required<TMDBMovieModel>();
}
