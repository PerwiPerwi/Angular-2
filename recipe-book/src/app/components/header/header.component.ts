import {Component, OnInit} from '@angular/core';

import { RecipeService } from "../../services/recipe.service";
import {AuthenticationService} from "../../services/authentication.service";
import {MessageService} from "../../services/message.service";
import {RecipeBookConstants} from "../../recipe-book-constants";
import {Router} from "@angular/router";

@Component({
  selector: 'rb-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.less']
})
export class HeaderComponent implements OnInit{

  constructor(private recipeService: RecipeService, private authenticatedService: AuthenticationService, private messageService: MessageService, private router: Router) {};
  
  ngOnInit () {
  }
  
  storeRecipes() {
    this.recipeService.storeRecipes().subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
  
  fetchRecipes() {
    this.recipeService.fetchRecipes();
  }
  
  isAuthenticated() {
    return this.authenticatedService.isAuthenticated();
  }
  logout() {
    this.authenticatedService.logout();
    this.messageService.getMessage('success.logout', RecipeBookConstants.MESSAGE_TYPE.SUCCESS);
    this.router.navigate(['/']);
  }
  
  
}

