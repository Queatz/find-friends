import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-friend-details',
  templateUrl: './friend-details.component.html',
  styleUrls: ['./friend-details.component.scss']
})
export class FriendDetailsComponent implements OnInit {

  friendFacts = [
    'Smokes cigarettes',
    'Smokes weed',
    'Vapes',
    'Drinks alcohol',
    'Uses drugs',
    'Hunts animals',
    'Eats meat',
    'Needs attention often',
    'Works a 9-5 job',
    'Often free on the weekends',
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
