import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { environment } from '@env/environment';
import {
  feedActions,
  selectError,
  selectFeedData,
  selectIsLoading,
} from '@shared/store';
import { FeedState } from '@shared/types';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    DatePipe,
    LoadingComponent,
    ErrorMessageComponent,
    PaginationComponent,
  ],
  templateUrl: './feed.component.html',
  styles: ``,
})
export class FeedComponent implements OnInit {
  apiUrl = input.required<string>();
  paginationLimit = environment.PAGINATION_LIMIT ?? 20;
  currentPage: number = 0;
  #router = inject(Router);
  baseUrl = this.#router.url.split('?')[0];
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  $data = computed<FeedState>(() => ({
    isLoading: this.#store.selectSignal(selectIsLoading)(),
    error: this.#store.selectSignal(selectError)(),
    data: this.#store.selectSignal(selectFeedData)(),
  }));

  ngOnInit() {
    this.#route.queryParams.subscribe((params: Params) => {
      this.currentPage = +params['page'] || 1;
      this.#fetchFeed();
    });
  }

  #fetchFeed(): void {
    this.#store.dispatch(feedActions.getFeed({ url: this.apiUrl() }));
  }
}
