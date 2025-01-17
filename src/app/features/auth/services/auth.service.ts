import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from '@env/environment';
import { CurrentUser } from '@shared/types';
import { SignInPayload, SignInResponse, SignUpPayload } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #baseUrl = environment.API_URL;

  getCurrentUser(): Observable<CurrentUser> {
    return this.#http
      .get<SignInResponse>(`${this.#baseUrl}/user`)
      .pipe(map(this.#getUser));
  }

  register(payload: SignUpPayload): Observable<CurrentUser> {
    return this.#http
      .post<SignInResponse>(`${this.#baseUrl}/users`, payload)
      .pipe(map(this.#getUser));
  }

  login(payload: SignInPayload): Observable<CurrentUser> {
    return this.#http
      .post<SignInResponse>(`${this.#baseUrl}/users/login`, payload)
      .pipe(map(this.#getUser));
  }

  #getUser(response: SignInResponse): CurrentUser {
    return response.user;
  }
}
