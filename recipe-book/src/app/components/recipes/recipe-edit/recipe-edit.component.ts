import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

import { Recipe } from "../../../models/recipe";
import { RecipeService } from "../../../services/recipe.service";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styleUrls: ['recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private subscription: Subscription;
  private recipeIndex;
  private isNew = true;
  private recipe: Recipe;
  
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) {
  }
  
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  private initForm() {
    let recipeName: String = "";
    let recipeImagePath: String = "";
    let recipeDescription: String = "";
    let recipeIngredients: FormArray = new FormArray([]);
    
    if (!this.isNew) {
      
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
                name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
                amount: new FormControl(this.recipe.ingredients[i].amount, [
                  Validators.required, Validators.pattern("\\d+")])
              }
            )
          );
        }
      }
      
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
      'name': [recipeName, Validators.required],
      'imagePath': [recipeImagePath, Validators.required],
      'description': [recipeDescription, Validators.required],
      'ingredients': recipeIngredients
    });
  }
  
  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addNewRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }
  
  private navigateBack() {
    this.router.navigate(['../']);
  }
  
  onCancel() {
    this.navigateBack();
  }
  
  removeIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(ingredientIndex);
  }
  
  addIngredient(newIngredientName: string, newIngredientAmount: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(newIngredientName, Validators.required),
        amount: new FormControl(newIngredientAmount, [
          Validators.required, Validators.pattern("\\d+")])
      })
    )
  }
  
  
}
