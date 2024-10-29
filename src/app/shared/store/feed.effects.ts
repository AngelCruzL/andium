import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';

import { FeedService } from '@shared/services';
import { feedActions } from './feed.actions';

export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map(feed => feedActions.getFeedSuccess({ feed })),
          catchError(() => of(feedActions.getFeedFailure())),
        );
      }),
    );
  },
  { functional: true },
);
