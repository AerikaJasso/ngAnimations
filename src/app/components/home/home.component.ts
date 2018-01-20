import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // define animations
    trigger('goals', [
      transition('* => *', [
        // When something enters the DOM.
        query(':enter', style({ opacity: 0}), { optional: true}),
        // Adding items triggers animation.
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translatyY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translatyY(35%)', offset: .3 }),
            style({ opacity: 1, transform: 'translatyY(0)', offset: 1 }),
          ]))]), { optional: true }),

        // when anything leaves the DOM.
        query(':leave', stagger('300ms', [
          // removes items on click event that calls removeItem().
          animate('.6s ease-in', keyframes([
            style({ opacity: 1, transform: 'translatyY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translatyY(35%)', offset: .3 }),
            style({ opacity: 0, transform: 'translatyY(-75%)', offset: 1 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})


export class HomeComponent implements OnInit {
  itemCount: number;
  btnText = 'Add a Goal';
  // default input value
  goalText = 'My first Goal';
  goals = [];
  constructor( private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res );
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    // add a new goal to array.
    this.goals.push(this.goalText);
    // clear input after submitted.
    this.goalText = '';
    // update item array after push.
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);

  }

  // trigger animation to remove item from the list.
  removeItem(i) {
    this.goals.splice(i, 1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }



}
