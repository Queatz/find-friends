import { Component, OnInit } from '@angular/core';

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
    'Works a 9-5 job',
    'Often free on the weekends',
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
