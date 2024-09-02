import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { CurrentUser } from '@shared/types';
import { SignInResponse, SignUpPayload } from '../types';
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
    const payload: SignUpPayload = {
      user: {
        username: 'testuser',
        password: 'password123',
        email: 'test@test.com',
      },
    };
    const response: SignInResponse = {
      user: {
        bio: null,
        image: null,
        username: 'testuser',
        token: 'some-token',
        email: 'test@test.com',
      },
    };
    let userResponse: CurrentUser | undefined;
    service.register(payload).subscribe(user => (userResponse = user));
    const req = httpTestingController.expectOne(req =>
      req.url.endsWith('/users'),
    );
    req.flush(response);
    expect(userResponse).toEqual(response.user);
  });
});
