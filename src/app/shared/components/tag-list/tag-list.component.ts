import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule],
  template: ` <ul class="tag-list" data-testId="tag-list">
    @for (tag of tags(); track tag) {
      <li class="tag-default tag-pill tag-outline">
        {{ tag }}
      </li>
    }
  </ul>`,
})
export class TagListComponent {
  tags = input<string[]>([]);
}
