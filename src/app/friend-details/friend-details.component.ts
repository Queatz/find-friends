import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss']
})
export class FriendDetailsComponent implements OnInit {

  friendFacts = [
    'Often available in the mornings',
    'Often available in the evenings',
    'Often available on the weekends',
    'Eats meat',
    'Hunts animals',
    'Is into astrology',
    'Drinks alcohol',
    'Vapes',
    'Uses drugs',
    'Smokes marijuana / weed',
    'Smokes cigarettes / tobacco',
  ]

  constructor(public user: UserService) {
    this.friendFacts.forEach(x => {
      if (!user.quiz.friendFacts.hasOwnProperty(x)) {
        user.quiz.friendFacts[x] = { choice: null, required: false }
      }
    })
  }

  ngOnInit(): void {
  }
}
