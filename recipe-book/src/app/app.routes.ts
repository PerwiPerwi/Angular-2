import { RouterModule } from "@angular/router";

import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { RECIPE_ROUTES } from "./components/recipes/recipes.routes";
import { SignInComponent } from "./components/authorization/sign-in/sign-in.component";
import { SignUpComponent } from "./components/authorization/sign-up/sign-up.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthenticationGuard } from "./authentication.guard";

export const APP_ROUTES_PROVIDERS = [
    { path : '' , redirectTo: '/recipes', pathMatch: 'full' },
    { path : 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard]}
];

export const routing = RouterModule.forRoot(APP_ROUTES_PROVIDERS);
