import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}
  subscription: Subscription;
  editMode = false;
  index: number;
  @ViewChild('form') form: NgForm;
  ngOnInit() {
    this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        const ingredient = stateData.editedIngredient;
        this.form.setValue({
          name: ingredient.name,
          amount: ingredient.amount,
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.ingredientFormLoaded.subscribe(
    //   (ingredientIndex) => {
    //     this.editMode = true;
    //     this.index = ingredientIndex;
    //     const ingredient: Ingredient = this.slService.getIngredientByIndex(
    //       ingredientIndex
    //     );
    //     this.form.setValue({
    //       name: ingredient.name,
    //       amount: ingredient.amount,
    //     });
    //   }
    // );
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    // this.slService.addIngredient(newIngredient, this.editMode, this.index);
    if (!this.editMode) {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.store.select('shoppingList').subscribe((shopping) => {
        console.log(shopping);
      });
    }
    this.store.dispatch(
      new ShoppingListActions.UpdateIngredient(newIngredient)
    );
    this.editMode = false;
    this.form.reset();
  }

  resetForm() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  deleteItem() {
    // this.slService.deleteIngredient(this.index);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.form.reset();
  }
}
