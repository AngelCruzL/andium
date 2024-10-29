import { GetFeedResponse } from '@shared/types';
import { feedArticlesMock } from '@shared/mocks/feed-articles.mock';

export const feedResponseMock: GetFeedResponse = {
  articles: feedArticlesMock,
  articlesCount: feedArticlesMock.length,
};
