import { render, screen } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FeedState } from '@shared/types';
import { selectError, selectFeedData, selectIsLoading } from '@shared/store';
import { FeedComponent } from './feed.component';

type Options = FeedState & { apiUrl: string };

const setup = async (options: Options) => {
  await render(FeedComponent, {
    providers: [
      provideMockStore({
        selectors: [
          { selector: selectIsLoading, value: options.isLoading },
          { selector: selectError, value: options.error },
          { selector: selectFeedData, value: options.data },
        ],
      }),
    ],
    imports: [RouterTestingModule],
    inputs: {
      apiUrl: options.apiUrl,
    },
  });
};

describe('FeedComponent', () => {
  it('should create', async () => {
    const options: Options = {
      isLoading: false,
      error: null,
      data: null,
      apiUrl: 'test-articles',
    };

    await setup(options);
    const feedComponent = screen.queryByTestId('feed');

    expect(feedComponent).toBeTruthy();
  });

  describe('Layout', () => {
    describe('Store', () => {
      it('should display loading component when isLoading is true', async () => {
        const options: Options = {
          isLoading: true,
          error: null,
          data: null,
          apiUrl: 'test-articles',
        };

        await setup(options);

        const loadingComponent = screen.queryByTestId('loader');
        expect(loadingComponent).toBeTruthy();
      });

      it('should display error message component when error exists', async () => {
        const options: Options = {
          isLoading: false,
          error: 'Error loading feed',
          data: null,
          apiUrl: 'test-articles',
        };

        await setup(options);

        const errorMessage = screen.queryByRole('alert');
        expect(errorMessage!.textContent!.trim()).toBe('Error loading feed');
      });

      it('should display feed data when data is available', async () => {
        const options: Options = {
          isLoading: false,
          error: null,
          data: {
            articles: [
              {
                body: '',
                createdAt: new Date().toISOString(),
                description: 'Test Description',
                favorited: false,
                favoritesCount: 0,
                slug: 'test-article',
                tagList: [],
                title: 'Test Article',
                updatedAt: new Date().toISOString(),
                author: {
                  username: 'user',
                  image: '',
                  bio: '',
                  following: false,
                },
              },
              {
                body: 'Body of article 2',
                createdAt: new Date().toISOString(),
                description: 'Second article description',
                favorited: true,
                favoritesCount: 5,
                slug: 'second-article',
                tagList: ['angular', 'typescript'],
                title: 'Second Article',
                updatedAt: new Date().toISOString(),
                author: {
                  username: 'alice',
                  image: 'https://example.com/alice.jpg',
                  bio: 'Frontend developer',
                  following: false,
                },
              },
              {
                body: 'Body of article 3',
                createdAt: new Date().toISOString(),
                description: 'Third article description',
                favorited: false,
                favoritesCount: 2,
                slug: 'third-article',
                tagList: ['testing'],
                title: 'Third Article',
                updatedAt: new Date().toISOString(),
                author: {
                  username: 'bob',
                  image: 'https://example.com/bob.jpg',
                  bio: 'Backend developer',
                  following: true,
                },
              },
            ],
            articlesCount: 1,
          },
          apiUrl: 'test-articles',
        };

        await setup(options);

        const articles = screen.queryAllByTestId('article-item');
        expect(articles.length).toBe(3);
        expect(screen.getByText('Test Article')).toBeTruthy();
        expect(screen.getByText('Test Description')).toBeTruthy();
        expect(screen.getByText('Second Article')).toBeTruthy();
        expect(screen.getByText('Second article description')).toBeTruthy();
        expect(screen.getByText('Third Article')).toBeTruthy();
        expect(screen.getByText('Third article description')).toBeTruthy();
      });
    });
  });
});
