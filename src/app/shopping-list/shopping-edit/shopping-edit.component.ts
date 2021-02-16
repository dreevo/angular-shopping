import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styles: [],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name') name: ElementRef;
  @ViewChild('amount') amount: ElementRef;
  @Output() onAddItem = new EventEmitter<Ingredient>();
  constructor() {}

  ngOnInit(): void {}

  loadData() {
    this.onAddItem.emit(
      new Ingredient(
        this.name.nativeElement.value,
        this.amount.nativeElement.value
      )
    );
  }
}
