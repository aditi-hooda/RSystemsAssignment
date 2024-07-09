import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  query: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  search() {
    this.searchEvent.emit(this.query);
  }
}
