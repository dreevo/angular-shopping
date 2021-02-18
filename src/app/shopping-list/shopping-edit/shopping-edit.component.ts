import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(private slService: ShoppingListService) {}
  subscription: Subscription;
  editMode = false;
  index: number;
  @ViewChild('form') form: NgForm;
  ngOnInit() {
    this.subscription = this.slService.ingredientFormLoaded.subscribe(
      (ingredientIndex) => {
        this.editMode = true;
        this.index = ingredientIndex;
        const ingredient: Ingredient = this.slService.getIngredientByIndex(
          ingredientIndex
        );
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    this.slService.addIngredient(newIngredient, this.editMode, this.index);
    this.editMode = false;
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
  }

  deleteItem() {
    this.slService.deleteIngredient(this.index);
    this.editMode = false;
    this.form.reset();
  }
}
