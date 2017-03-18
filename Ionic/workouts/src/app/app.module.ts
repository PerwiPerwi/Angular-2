import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { WorkoutsPage } from "../pages/workouts/workouts";
import { InfoPage } from "../pages/info/info";
import {AddWorkoutPage} from "../pages/add-workout/add-workout";
import {WorkoutService} from "../providers/workout.service";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    WorkoutsPage,
    InfoPage,
    AddWorkoutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    WorkoutsPage,
    InfoPage,
    AddWorkoutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, WorkoutService]
})
export class AppModule {}
