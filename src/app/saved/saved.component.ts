import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MealComponent} from "../meal/meal.component";
import {NgForOf} from "@angular/common";
import {addMealToSaved, getMeals, getSavedMeals, addYourMealToDb, Meal} from "../Utils";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [
    MealComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css'
})
export class SavedComponent {
  @ViewChild('element') element: ElementRef | undefined;
  meals: Meal[] = [];
  userMeals: Meal[] = [];



  async ngOnInit() {
    await this.fetchSavedMeals();
    await this.fetchUserMeals();
  }

  protected async fetchSavedMeals() {
    try {
      this.meals = await getSavedMeals();
      console.log(this.meals);
    }
    catch (error) {
      console.error('Failed to fetch saved meals', error);
    }
  }

  protected async fetchUserMeals() {
    try {
      this.userMeals = await getMeals();
      console.log(this.userMeals);
    } catch (error) {
      console.error('Failed to fetch meals', error);
    }
  }

  addMealToYour() {
    if (!this.element) {
      console.error('Element not found');
      return;
    }
    this.element.nativeElement.classList.toggle('show');
  }
  addYourMeal() {
    const strMeal = (<HTMLInputElement>document.querySelector('.add-your-meal__name')).value;
    const strInstructions = (<HTMLInputElement>document.querySelector('.add-your-meal__instructions')).value;
    const strMealThumb = (<HTMLInputElement>document.querySelector('.add-your-meal__image')).value;
    const meal:Meal = {id: Date.now(), strMeal, strInstructions, strMealThumb, idMeal: Date.now()};
    addYourMealToDb(meal);
  }
}

