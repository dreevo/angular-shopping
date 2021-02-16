import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() onTogglePage = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  togglePage(page: string) {
    this.onTogglePage.emit(page);
  }
}
