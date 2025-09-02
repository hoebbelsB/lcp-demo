import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { AppShellComponent } from './app-shell/app-shell.component';
import { BannerComponent } from './shared/banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppShellComponent, BannerComponent],
  template: `
    <app-shell>
      @if (showBanner()) {
        <banner />
      }
      <router-outlet />
    </app-shell>
  `,
})
export class AppComponent {
  #router = inject(Router);

  showBanner = toSignal(
    this.#router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url),
      startWith(this.#router.url),
      map((url) => url.includes('list')),
    ),
  );
}
