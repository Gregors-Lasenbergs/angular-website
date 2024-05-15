import {Component, Input, Type} from '@angular/core';
import {addMealToSaved, Meal} from '../Utils';
import {type} from "node:os";

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
    const id: number = Number(this.meal.idMeal);
    // check id type
    if (typeof id !== 'number') {
      console.error('Invalid meal id');
      return;
    }
    addMealToSaved(id);
  }
}
