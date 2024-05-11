import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from "../nav-bar/nav-bar.component";
import {getMeals} from "../Utils";
import {MealComponent} from "../meal/meal.component";
import {NgForOf} from "@angular/common";
import {Meal} from "../Utils";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    MealComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  meals: Meal[] = [];

  ngOnInit() {
    this.fetchMeals('');
  }

  async fetchMeals(mealName: string) {
    try {
      this.meals = await getMeals(mealName);
      console.log(this.meals);
    }
    catch (error) {
      console.error('Failed to fetch meals', error);
    }
  }

  search() {
    const mealName = (<HTMLInputElement>document.querySelector('.searchBar')).value;
    this.fetchMeals(mealName);
  }
}
