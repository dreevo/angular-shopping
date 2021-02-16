import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Grilled Basil Chicken',
      'TAfter washing basil and tomatoes, blot them dry with clean paper towel.',
      'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Grilled-Basil-Chicken-and-Tomatoes_EXPS_DSBZ17_37304_B01_19_5b.jpg'
    ),
    new Recipe(
      'Miso-Marinated Short Ribs',
      'In small bowl, stir together miso, mayonnaise, and 2 tbsp vinegar. ',
      'https://assets.bonappetit.com/photos/5a04d3a481ac2a5925c1c1c0/5:4/w_3459,h_2767,c_limit/miso-and-mayo-marinated-short-ribs-with-spicy-sauce.jpg'
    ),
    new Recipe(
      'Cantaloupe Gazpacho',
      'In blender, puree cantaloupe, cucumber, onion, salt and water until smooth, about 1 – 2 minutes.',
      'https://www.seriouseats.com/recipes/images/2014/07/20140722-cantaloupe-gazpacho-lauren-rothman-1500x1122.jpg'
    ),
  ];
  @Output() onSendToParent = new EventEmitter<Recipe>();

  assignLoadedItem(recipe: Recipe) {
    this.onSendToParent.emit(recipe);
  }

  constructor() {}

  ngOnInit(): void {}
}
