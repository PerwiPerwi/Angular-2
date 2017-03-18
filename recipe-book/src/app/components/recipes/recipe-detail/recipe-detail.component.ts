import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { Recipe } from "../../../models/recipe";
import { Subscription } from "rxjs";
import { ShoppingListService } from "../../../services/shopping-list.service";
import { RecipeService } from "../../../services/recipe.service";
import {MessageService} from "../../../services/message.service";
import {RecipeBookConstants} from "../../../recipe-book-constants";

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: 'recipe-detail.component.html',
  styleUrls: ['recipe-detail.component.less']
})

export class RecipeDetailComponent implements OnInit, OnDestroy {

  private recipeIndex: number;
  private subscription: Subscription;
  selectedRecipe: Recipe;
  
  constructor(private sls: ShoppingListService, private router: Router, private route: ActivatedRoute, private recipeService: RecipeService, private messageService: MessageService) {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
      }
    );
  }

  ngOnInit() {
  
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  addToShoppingList(){
    this.sls.addItems(this.selectedRecipe.ingredients);
  }
  
  onEdit() {
    return this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }
  
  onDelete() {
    if (this.recipeService.deleteRecipe(this.selectedRecipe)) {
      this.messageService.getMessage('success.onDelete', RecipeBookConstants.MESSAGE_TYPE.SUCCESS);
      return this.router.navigate(['/recipes']);
    } else {
      this.messageService.getMessage('error.onDelete', RecipeBookConstants.MESSAGE_TYPE.ERROR);
    }
  }
  

}
