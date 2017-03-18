import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { ShoppingListService } from "../../services/shopping-list.service";
import { Ingredient } from "../../models/ingredient";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: 'shopping-list-add.component.html',
  styleUrls: ['shopping-list-add.component.less']
})
export class ShoppingListAddComponent implements OnChanges {
  isAdd = true;
  @Input() item: Ingredient;
  @Output() cleared = new EventEmitter();
  
  constructor(private shoppingListService: ShoppingListService) {
  }
  
  ngOnChanges(changes) {
    if (changes.item.currentValue === null) {
      this.isAdd = true;
      this.item = {
        name: null,
        amount: null
      }
    } else {
      this.isAdd = false;
    }
  }
  
  onAdd(ingredient: Ingredient) {
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    if (!this.isAdd) {
      this.shoppingListService.editItem(this.item, newIngredient);
    } else {
      this.shoppingListService.addItem(newIngredient);
      this.onClear();
    }
  }
  
  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.onClear();
  }
  
  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }
  
}
