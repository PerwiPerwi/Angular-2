import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppComponent } from './recipe-book.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingListAddComponent } from './components/shopping-list/shopping-list-add.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { ShoppingListService } from "./services/shopping-list.service";
import { routing } from "./app.routes";
import { RecipeStartComponent } from './components/recipes/recipe-start.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { TranslateStaticLoader, TranslateLoader, TranslateModule } from "ng2-translate";
import { ToastyModule } from "ng2-toasty";
import { MessageService } from "./services/message.service";
import { SignUpComponent } from './components/authorization/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthenticationService } from "./services/authentication.service";
import { SignInComponent } from "./components/authorization/sign-in/sign-in.component";
import { AuthenticationGuard } from "./authentication.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListComponent,
    ShoppingListAddComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    }),
    ToastyModule.forRoot()
  ],
  providers: [ShoppingListService, MessageService, AuthenticationService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
