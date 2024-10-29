import { feedResponseMock } from '@shared/mocks';
import { feedReducer, initialState } from './feed.reducers';
import { feedActions } from './feed.actions';

describe('FeedReducers', () => {
  it('should returns a default state', () => {
    const action = { type: 'Unknown' };
    const state = feedReducer(initialState, action);
    const newState = {
      isLoading: false,
      error: null,
      data: null,
    };

    expect(state).toEqual(newState);
  });

  describe('getFeed', () => {
    it('should trigger the "getFeed" reducer at getFeedAction', () => {
      const action = feedActions.getFeed({ url: 'url' });
      const state = feedReducer(initialState, action);
      const newState = {
        isLoading: true,
        error: null,
        data: null,
      };

      expect(state).toEqual(newState);
    });

    it('should trigger the "getFeedSuccess" reducer at getFeedSuccess action', () => {
      const action = feedActions.getFeedSuccess({ feed: feedResponseMock });
      const state = feedReducer(initialState, action);
      const newState = {
        isLoading: false,
        error: null,
        data: feedResponseMock,
      };

      expect(state).toEqual(newState);
    });

    it('should trigger the "getFeedFailure" reducer at getFeedFailure action', () => {
      const action = feedActions.getFeedFailure();
      const state = feedReducer(initialState, action);
      const newState = {
        isLoading: false,
        error: 'Error getting feed',
        data: null,
      };

      expect(state).toEqual(newState);
    });
  });

  it('should clean state at routerNavigatedAction', () => {
    const action = { type: '@ngrx/router-store/navigated' };
    const state = feedReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
