import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  template: `
    <div class="banner" role="banner">
      <div class="container">
        <h1>Medium Clone</h1>
        <p>Place to share your knowledge.</p>
      </div>
    </div>
  `,
  styles: ``,
})
export class BannerComponent {}
