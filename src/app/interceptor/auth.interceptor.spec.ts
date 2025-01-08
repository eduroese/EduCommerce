import { TestBed } from '@angular/core/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const token = 'test_token';
    localStorage.setItem('jwt_token', token);

    const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['clone']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    const httpEventMock = {} as HttpEvent<any>;

    httpRequestSpy.clone.and.returnValue(httpRequestSpy);
    httpHandlerSpy.handle.and.returnValue(of(httpEventMock));

    interceptor
      .intercept(httpRequestSpy as any, httpHandlerSpy)
      .subscribe(() => {
        expect(httpRequestSpy.clone).toHaveBeenCalledWith({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      });
  });
});
