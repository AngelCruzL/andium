import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';

import { feedResponseMock } from '@shared/mocks';
import { FeedService } from '@shared/services';
import { feedActions } from './feed.actions';
import { getFeedEffect } from './feed.effects';

describe('FeedEffects', () => {
  describe('getFeedEffect', () => {
    it('should return a "getFeedSuccess" action on success', () => {
      const feedServiceMock = {
        getFeed: () => of(feedResponseMock),
      } as unknown as FeedService;
      const actionsMock$ = of(feedActions.getFeed({ url: 'url' }));

      TestBed.configureTestingModule({
        providers: [
          { provide: FeedService, useValue: feedServiceMock },
          { provide: Actions, useValue: actionsMock$ },
        ],
      });

      TestBed.runInInjectionContext(() => {
        getFeedEffect().subscribe(action => {
          expect(action).toEqual(
            feedActions.getFeedSuccess({ feed: feedResponseMock }),
          );
        });
      });
    });

    it('should return a "getFeedFailure" action on error', () => {
      const feedServiceMock = {
        getFeed: () => throwError(() => ({})),
      } as unknown as FeedService;
      const actionsMock$ = of(feedActions.getFeed({ url: 'error' }));

      TestBed.configureTestingModule({
        providers: [
          { provide: FeedService, useValue: feedServiceMock },
          { provide: Actions, useValue: actionsMock$ },
        ],
      });

      TestBed.runInInjectionContext(() => {
        getFeedEffect().subscribe(action => {
          expect(action).toEqual(feedActions.getFeedFailure());
        });
      });
    });
  });
});
