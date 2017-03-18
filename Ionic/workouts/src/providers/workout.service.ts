import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "../enviroment";

@Injectable()
export class WorkoutService {

  constructor(public http: Http) {}

  getWorkouts() {
    return this.http.get(environment.API_URL + '?apiKey=' + environment.M_LAB_API_KEY).map(res => res.json());
  }

}
