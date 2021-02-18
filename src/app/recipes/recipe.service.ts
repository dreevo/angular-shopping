import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   'Grilled Basil Chicken',
    //   'After washing basil and tomatoes, blot them dry with clean paper towel.',
    //   'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Grilled-Basil-Chicken-and-Tomatoes_EXPS_DSBZ17_37304_B01_19_5b.jpg',
    //   [new Ingredient('Tomato', 12), new Ingredient('Corn', 3)]
    // ),
    // new Recipe(
    //   'Miso-Marinated Short Ribs',
    //   'In small bowl, stir together miso, mayonnaise, and 2 tbsp vinegar. ',
    //   'https://assets.bonappetit.com/photos/5a04d3a481ac2a5925c1c1c0/5:4/w_3459,h_2767,c_limit/miso-and-mayo-marinated-short-ribs-with-spicy-sauce.jpg',
    //   [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    // ),
    // new Recipe(
    //   'Cantaloupe Gazpacho',
    //   'In blender, puree cantaloupe, cucumber, onion, salt and water until smooth, about 1 – 2 minutes.',
    //   'https://www.seriouseats.com/recipes/images/2014/07/20140722-cantaloupe-gazpacho-lauren-rothman-1500x1122.jpg',
    //   [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    // ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes);
  }
}
