import { Component } from '@angular/core';
import { FeedComponent } from '@shared/components/feed/feed.component';

@Component({
  selector: 'app-global-feed',
  standalone: true,
  imports: [FeedComponent],
  templateUrl: './global-feed.component.html',
  styles: ``,
})
export class GlobalFeedComponent {
  apiUrl = 'articles';
}
