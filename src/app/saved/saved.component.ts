import { Component } from '@angular/core';
import {MealComponent} from "../meal/meal.component";
import {NgForOf} from "@angular/common";
import {getSavedMeals, Meal} from "../Utils";

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [
    MealComponent,
    NgForOf
  ],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent {
  meals: Meal[] = [];
  async ngOnInit() {
    await this.fetchSavedMeals();
  }

  private async fetchSavedMeals() {
    try {
      this.meals = await getSavedMeals();
      console.log(this.meals);
    }
    catch (error) {
      console.error('Failed to fetch saved meals', error);
    }
  }
}
