import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() nextPageEvent = new EventEmitter<void>();
  @Output() prevPageEvent = new EventEmitter<void>();

  nextPage() {
    this.nextPageEvent.emit();
  }

  prevPage() {
    this.prevPageEvent.emit();
  }
}
