import { Component } from '@angular/core';

import { BannerComponent, FeedComponent } from '@shared/components';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [FeedComponent, BannerComponent],
  templateUrl: './global-feed.component.html',
  styles: ``,
})
export class GlobalFeedComponent {
  apiUrl = 'articles';
}
