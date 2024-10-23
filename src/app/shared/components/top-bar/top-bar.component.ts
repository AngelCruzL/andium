import { Component, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { TopBarState } from '../../../features/auth/types';
import { selectCurrentUser } from '../../../features/auth/store';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './top-bar.component.html',
  styles: ``,
})
export class TopBarComponent {
  #store = inject(Store);
  $data: Signal<TopBarState> = toSignal(
    combineLatest({
      currentUser: this.#store.select(selectCurrentUser),
    }),
    { initialValue: { currentUser: undefined } },
  );
}
