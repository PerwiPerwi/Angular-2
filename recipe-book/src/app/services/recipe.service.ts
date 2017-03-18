import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';

import { Recipe } from "../models/recipe";
import { Ingredient } from "../models/ingredient";

@Injectable()
export class RecipeService {
  
  recipesChanged = new EventEmitter<Recipe []>();
  
  private recipes: Recipe[] = [
    new Recipe('Jajecznica', 'Ekstra jajecznica z boczkiem', 'http://www.osesek.pl/files/jajecznica-gotowana-na-parze.jpg',
      [new Ingredient('Jajka', 5),
        new Ingredient('Boczek', 5)]),
    new Recipe('Kanapka', 'Kanapka z jakiem', 'http://konkol.pl/wp-content/uploads/2015/12/kanapka-kajzerka-m.jpg',
      [new Ingredient('Chleb', 2),
        new Ingredient('Jajko', 2)]),
    new Recipe('Owsianka', 'Owsianka z bananem', 'http://tipsforwomen.pl/wp-content/uploads/2014/08/Depositphotos_65526737_l-2015-1068x711.jpg',
      [new Ingredient('Płatki owsiane', 2),
        new Ingredient('Mleko', 2),
        new Ingredient('Banan', 1)])];
  
  constructor(private http: Http) {
  }
  
  getRecipes() {
    return this.recipes;
  }
  
  getRecipe(recipeIndex: number) {
    return this.recipes[recipeIndex];
  }
  
  deleteRecipe(recipe: Recipe) {
    return this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }
  
  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  
  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }
  
  storeRecipes() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    
    return this.http.put('https://recipebook-75817.firebaseio.com/recipes.json', body, {
      headers: headers
    });
  }
  
  fetchRecipes() {
    return this.http.get('https://recipebook-75817.firebaseio.com/recipes.json').map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
  
}
