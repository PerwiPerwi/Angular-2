import { Component, OnInit } from '@angular/core';

import { Ingredient } from "../../models/ingredient";
import { ShoppingListService } from "../../services/shopping-list.service";

@Component({
  selector: 'rb-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['shopping-list.component.less']
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient = null;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingListService.getItems();
  }
  
  onSelect(ingredient: Ingredient) {
    this.selectedItem = ingredient;
  }
  
  onCleared() {
    this.selectedItem = null;
  }

}
