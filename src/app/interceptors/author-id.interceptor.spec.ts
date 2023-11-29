import { TestBed } from '@angular/core/testing';

import { AuthorIdInterceptor } from './author-id.interceptor';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('AuthorIdInterceptor', () => {
  let interceptor: AuthorIdInterceptor;
  let request: HttpRequest<any>;
  let next: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[AuthorIdInterceptor, HttpHandler],
    })
    interceptor = new AuthorIdInterceptor();
    request = new HttpRequest('GET', `${environment.apiUrl}/bp/products`);
    next = {
      handle: jest.fn().mockReturnValue(of()),
    } as any;
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add the authorId header to the request', () => {
    interceptor.intercept(request, next).subscribe((event: HttpEvent<any>) => {
      expect(event instanceof HttpResponse).toBe(true);
      if (event instanceof HttpRequest) {
        const reqClone = event.clone({
          setHeaders: {
            'authorId': environment.authorId,
          },
        });
        expect(reqClone.headers.get('authorId')).toBe(environment.authorId);
      }
    });
  });
});
