import { Component, computed, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import queryString from 'query-string';

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
import { TagListComponent } from '@shared/components/tag-list/tag-list.component';

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
    TagListComponent,
  ],
  templateUrl: './feed.component.html',
  styles: ``,
})
export class FeedComponent implements OnInit {
  apiUrl = input.required<string>();
  paginationLimit = environment.PAGINATION_LIMIT ?? 20;
  currentPage = 0;
  readonly #router = inject(Router);
  baseUrl = this.#router.url.split('?')[0];
  readonly #route = inject(ActivatedRoute);
  readonly #store = inject(Store);
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
    const offset =
      this.currentPage * +this.paginationLimit - +this.paginationLimit;
    const parsedUrl = queryString.parseUrl(this.apiUrl());
    const stringifiedParams = queryString.stringify({
      limit: this.paginationLimit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
    this.#store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }));
  }
}
