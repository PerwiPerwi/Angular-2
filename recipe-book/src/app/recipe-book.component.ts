import { Component } from '@angular/core';
import {RecipeService} from "./services/recipe.service";
import { ToastyConfig } from 'ng2-toasty';
import {TranslateService} from "ng2-translate";

@Component({
  selector: 'rb-root',
  templateUrl: 'recipe-book.component.html',
  providers: [RecipeService]
})

export class AppComponent {

  constructor(translate: TranslateService, toastyConfig: ToastyConfig) {
    translate.setDefaultLang('pl');
    toastyConfig.position = 'top-center';
  }

}
