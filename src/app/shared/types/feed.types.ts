import { Article } from '@shared/types/article.types';

export interface GetFeedResponse {
  articles: Article[];
  articlesCount: number;
}
