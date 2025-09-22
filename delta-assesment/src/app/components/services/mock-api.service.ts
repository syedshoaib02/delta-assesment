import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  submit(payload: any) {
    const ok = Math.random() > 0.15;
    if (ok) return of({ status: 'ok', payload }).pipe(delay(500));
    return throwError(() => new Error('Mock server error')).pipe(delay(700));
  }
}
