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

  constructor() {
    const lcpObserver = new PerformanceObserver((events) => {
      console.log(events.getEntries());
      if (events.getEntries().length > 0) {
        const gtmScript = document.createElement('script');

        gtmScript.text = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-PTJVTDBF');`;

        gtmScript.type = 'text/javascript';
        document.head.appendChild(gtmScript);
        lcpObserver.disconnect();
      }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: false });
  }
}
