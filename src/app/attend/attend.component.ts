import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.scss']
})
export class AttendComponent implements OnInit {

  suggestions = [
    {
      id: '1',
      count: 2,
    }, {
      id: '2',
      count: 1,
    }
  ]

  meetChosen?: string
  timeIsExpired = false
  meetHasAlreadyBegun = false

  constructor() { }

  ngOnInit(): void {
  }

  expired() {
    this.timeIsExpired = true
    this.suggestions.length = 0
  }

  addMeetSuggestion() {
    this.suggestions.push(
      {
        id: '3',
        count: 1,
      }
    )

    this.meetChosen = '3'
  }
}
