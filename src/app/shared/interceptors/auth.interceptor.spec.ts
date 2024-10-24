import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { PersistenceService } from '@shared/services';

interface MockHttpRequest extends HttpRequest<unknown> {
  clone: jest.Mock;
}

describe('authInterceptor', () => {
  let persistenceService: PersistenceService;
  let interceptor: HttpInterceptorFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PersistenceService, useValue: { get: jest.fn() } },
      ],
    });

    persistenceService = TestBed.inject(PersistenceService);
    interceptor = (req, next) =>
      TestBed.runInInjectionContext(() => authInterceptor(req, next));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', () => {
    const token = 'test-token';
    persistenceService.get = jest.fn().mockReturnValue(token);

    const req = { clone: jest.fn() } as unknown as MockHttpRequest;
    const next = jest.fn();

    interceptor(req, next);

    expect(req.clone).toHaveBeenCalledWith({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
  });

  it('should not add Authorization header if token does not exist', () => {
    persistenceService.get = jest.fn().mockReturnValue(null);

    const req = { clone: jest.fn() } as unknown as MockHttpRequest;
    const next = jest.fn();

    interceptor(req, next);

    expect(req.clone).toHaveBeenCalledWith({
      setHeaders: {
        Authorization: '',
      },
    });
  });
});
