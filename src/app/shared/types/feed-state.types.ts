import { GetFeedResponse } from '@shared/types';

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: GetFeedResponse | null;
}
