import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  feedActions,
  selectError,
  selectFeedData,
  selectIsLoading,
} from '@shared/store';
import { FeedState } from '@shared/types';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe,
    LoadingComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './feed.component.html',
  styles: ``,
})
export class FeedComponent implements OnInit {
  apiUrl = input.required<string>();
  #store = inject(Store);

  $data = computed<FeedState>(() => ({
    isLoading: this.#store.selectSignal(selectIsLoading)(),
    error: this.#store.selectSignal(selectError)(),
    data: this.#store.selectSignal(selectFeedData)(),
  }));

  ngOnInit() {
    this.#store.dispatch(feedActions.getFeed({ url: this.apiUrl() }));
  }
}
