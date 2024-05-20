import {Component, EventEmitter, Input, Output, Type} from '@angular/core';
import {addMealToSaved, removeMealFromDb, editSavedMeal, Meal} from '../Utils';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})

export class MealComponent {
  @Input() saved: String = "false";
  @Input() meal!: Meal;


  saveMeal() {
    const id: number = Number(this.meal.idMeal);
    addMealToSaved(id)
  }
  deleteMeal(saved:boolean) {
    console.log(this.meal);
    removeMealFromDb(this.meal.idMeal, saved);
  }

  showEditPopUp() {
    const editPopUp = document.querySelectorAll('.meal-edit')[0];
    editPopUp.classList.toggle('show');
  }

  editYourMeal() {
    const strMeal = (<HTMLInputElement>document.querySelector('.edit-name')).value;
    const strInstructions = (<HTMLInputElement>document.querySelector('.edit-image')).value;
    const strMealThumb = (<HTMLInputElement>document.querySelector('.edit-instructions')).value;
    const meal:Meal = {id: this.meal.id, strMeal: strMeal, strInstructions: strInstructions, strMealThumb: strMealThumb, idMeal: this.meal.idMeal};
    const editPopUp = document.querySelectorAll('.meal-edit')[0];
    editPopUp.classList.toggle('show');
    editSavedMeal(meal);
  }

  closeEditPopUp() {
    const editPopUp = document.querySelectorAll('.meal-edit')[0];
    editPopUp.classList.toggle('show');
  }
}
