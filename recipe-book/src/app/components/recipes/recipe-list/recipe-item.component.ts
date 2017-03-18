import { Component, Input } from '@angular/core';

import { Recipe } from "../../../models/recipe";

@Component({
  selector: 'rb-recipe-item',
  templateUrl: 'recipe-item.component.html',
  styleUrls: ['recipe-item.component.less']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;

}
