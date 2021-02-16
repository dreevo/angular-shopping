import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() onItemLoad = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  sendDetails() {
    this.onItemLoad.emit(this.recipe);
  }
}
