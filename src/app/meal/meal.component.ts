import { Component, Input } from '@angular/core';
import {addMealToSaved, Meal} from '../Utils';
import {identity} from "rxjs";

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})

export class MealComponent {
  @Input() meal!: Meal;

  saveMeal() {
    const id = Number(this.meal.idMeal)
    addMealToSaved(id);
  }
}
