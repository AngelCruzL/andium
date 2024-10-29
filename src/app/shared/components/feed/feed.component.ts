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

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, DatePipe],
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
