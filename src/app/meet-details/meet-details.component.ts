import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meet-details',
  templateUrl: './meet-details.component.html',
  styleUrls: ['./meet-details.component.scss']
})
export class MeetDetailsComponent implements OnInit {

  meetFacts = [
    'Smoking',
    'Vaping',
    'Swearing',
    'Not talking',
  ]

  meetLocations = [
    'Park',
    'Library',
    'Cafe',
    'Restaurant',
    'Bar',
    'On the street',
    'Anything goes',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
