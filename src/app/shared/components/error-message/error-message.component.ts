import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [],
  template: `
    <div>
      {{ errorMessage() }}
    </div>
  `,
  styles: ``,
})
export class ErrorMessageComponent {
  errorMessage = input('Something went wrong');
}
