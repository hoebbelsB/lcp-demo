import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'banner',
  template: `
    <img
      class="banner-image"
      src="/assets/images/lcp-banner_small.jpg"
      sizes="100vw"
      srcset="
        /assets/images/lcp-banner_small.jpg   800w,
        /assets/images/lcp-banner_medium.jpg 1500w,
        /assets/images/lcp-banner_large.jpg  2500w
      "
      alt=""
      width="200"
      height="109"
      fetchpriority="high"
    />
    <h1 class="banner-heading">A Movie App</h1>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      padding: 4px;
      position: relative;
      margin-bottom: 10px;
    }
    .banner-heading {
      position: absolute;
      top: 12px;
      left: 0;
      right: 0;
      text-align: center;
      color: white;
      font-size: 32px;
    }
    .banner-image {
      width: 100%;
      height: auto;
      max-height: 480px;
      box-shadow: 1px 2px 6px 2px black;
      object-fit: cover;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent {}
