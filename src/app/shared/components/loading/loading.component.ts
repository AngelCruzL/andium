import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: ` <div data-testId="loader">Loading...</div> `,
  styles: ``,
})
export class LoadingComponent {}
