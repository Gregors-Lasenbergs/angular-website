import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})



export class MealComponent {
  @Input() strInstructions: String =  "";
  @Input() idMeal: Number = 0;
  @Input() strMeal: String =  "";
  @Input() strMealThumb: String =  "";
}
