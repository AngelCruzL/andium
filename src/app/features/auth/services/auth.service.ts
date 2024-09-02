import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CurrentUser } from '@shared/types';
import { SignInResponse, SignUpPayload } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #baseUrl = environment.API_URL;

  register(payload: SignUpPayload): Observable<CurrentUser> {
    return this.#http
      .post<SignInResponse>(`${this.#baseUrl}/users`, payload)
      .pipe(map(response => response.user));
  }
}
