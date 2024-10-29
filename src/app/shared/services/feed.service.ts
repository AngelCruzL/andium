import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { GetFeedResponse } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  #http = inject(HttpClient);
  #baseUrl = environment.API_URL;

  getFeed(url: string): Observable<GetFeedResponse> {
    return this.#http.get<GetFeedResponse>(`${this.#baseUrl}/${url}`);
  }
}
