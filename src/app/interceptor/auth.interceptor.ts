import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obtendo o token do localStorage (supondo que o token esteja armazenado lá)
    const token = localStorage.getItem('jwt_token');

    // Se o token existir, adicione ao cabeçalho Authorization
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Prosseguir com a requisição clonada
      return next.handle(cloned);
    }

    // Se não houver token, apenas prosseguir com a requisição original
    return next.handle(req);
  }
}
