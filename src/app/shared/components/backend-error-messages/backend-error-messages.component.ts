import { Component, computed, input } from '@angular/core';

import { BackendErrors } from '@shared/types';

@Component({
  selector: 'app-backend-error-messages',
  standalone: true,
  imports: [],
  template: `
    <div role="alert">
      <ul class="error-messages">
        @for (message of errorMessages(); track message) {
          <li>{{ message }}</li>
        }
      </ul>
    </div>
  `,
  styles: `
    li {
      list-style: none;
    }
  `,
})
export class BackendErrorMessagesComponent {
  backendErrors = input.required<BackendErrors | null>();
  errorMessages = computed(() => {
    const errors = this.backendErrors();
    if (!errors) return [];

    return Object.keys(errors).map(
      name => `${name} ${errors[name].join(', ')}`,
    );
  });
}
