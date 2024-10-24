import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { TopBarComponent } from '@shared/components';
import { authActions } from './features/auth/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  template: `
    <app-top-bar />
    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  #store = inject(Store);

  ngOnInit(): void {
    this.#store.dispatch(authActions.getCurrentUser());
  }
}
