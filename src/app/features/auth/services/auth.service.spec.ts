import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CurrentUser } from '@shared/types';
import {
  signInPayloadMock,
  signInResponseMock,
  signUpPayloadMock,
} from '../utils';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user successfully', () => {
    let userResponse: CurrentUser | undefined;
    service
      .register(signUpPayloadMock)
      .subscribe(user => (userResponse = user));
    const req = httpTestingController.expectOne(req =>
      req.url.endsWith('/users'),
    );
    req.flush(signInResponseMock);

    expect(userResponse).toEqual(signInResponseMock.user);
  });

  it('should login user successfully', () => {
    let userResponse: CurrentUser | undefined;
    service.login(signInPayloadMock).subscribe(user => (userResponse = user));
    const req = httpTestingController.expectOne(req =>
      req.url.endsWith('/users/login'),
    );
    req.flush(signInResponseMock);

    expect(userResponse).toEqual(signInResponseMock.user);
  });
});
