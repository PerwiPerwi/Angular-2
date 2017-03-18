import { Component } from '@angular/core';

import { WorkoutsPage } from "../workouts/workouts";
import { InfoPage } from "../info/info";
import { AddWorkoutPage } from "../add-workout/add-workout";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  workoutsRoot: any = WorkoutsPage;
  infoRoot: any = InfoPage;
  addWorkoutRoot: any = AddWorkoutPage;

  constructor() {

  }
}
