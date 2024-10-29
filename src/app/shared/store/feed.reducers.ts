import { createFeature, createReducer, on } from '@ngrx/store';
import { FeedState } from '@shared/types';

import { feedActions } from './feed.actions';
import { routerNavigatedAction } from '@ngrx/router-store';

export const initialState: FeedState = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, state => ({ ...state, isLoading: true })),
    on(feedActions.getFeedSuccess, (state, { feed }) => ({
      ...state,
      isLoading: false,
      data: feed,
    })),
    on(feedActions.getFeedFailure, state => ({
      ...state,
      error: 'Error getting feed',
      isLoading: false,
    })),

    on(routerNavigatedAction, () => initialState),
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectIsLoading,
  selectError,
  selectData: selectFeedData,
} = feedFeature;
