import { Component, inject, input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { UtilsService } from '@shared/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, RouterLink],
  template: `
    <ul class="pagination" data-testId="pagination">
      @for (page of pages; track page) {
        <li class="page-item" [ngClass]="{ active: currentPage() === page }">
          <a [routerLink]="url()" class="page-link" [queryParams]="{ page }">{{
            page
          }}</a>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class PaginationComponent implements OnInit {
  paginationLimit = input.required<number>();
  totalItems = input.required<number>();
  currentPage = input.required<number>();
  url = input.required<string>();
  pagesCount = 1;
  pages: number[] = [];
  readonly #utilsService = inject(UtilsService);

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalItems() / this.paginationLimit());
    this.pages =
      this.pagesCount > 0
        ? this.#utilsService.range(1, this.pagesCount + 1)
        : [];
  }
}
