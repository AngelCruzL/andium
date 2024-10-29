import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { GetFeedResponse } from '@shared/types';
import { feedResponseMock } from '@shared/mocks';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(FeedService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make the http request to get the feed successfully', () => {
    let feedResponse: GetFeedResponse | undefined;
    service.getFeed('test-feed').subscribe(feed => (feedResponse = feed));
    const req = httpTestingController.expectOne(req =>
      req.url.endsWith('/test-feed'),
    );
    req.flush(feedResponseMock);

    expect(feedResponse?.articlesCount).toEqual(5);
  });

  it('should handle 400 error response gracefully', () => {
    const errorMessage = '400 error';
    service.getFeed('test-feed').subscribe(
      () => fail('expected an error, not feed'),
      error => expect(error.status).toBe(400),
    );

    const req = httpTestingController.expectOne(req =>
      req.url.endsWith('/test-feed'),
    );
    req.flush(errorMessage, { status: 400, statusText: 'Bad Request' });
  });
});
