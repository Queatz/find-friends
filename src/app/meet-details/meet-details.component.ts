import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-meet-details',
  templateUrl: './meet-details.component.html',
  styleUrls: ['./meet-details.component.scss']
})
export class MeetDetailsComponent implements OnInit {

  meetPreferences = [
    'Smoking',
    'Vaping',
    'Swearing',
    'Not talking',
  ]

  meetPlaces = [
    'Park',
    'Library',
    'Cafe',
    'Restaurant',
    'Bar',
    'Mall',
    'On the street',
    'Anything goes',
  ]

  constructor(public user: UserService, private router: Router) {
    this.meetPreferences.forEach(x => {
      if (!user.quiz.meetPreferences.hasOwnProperty(x)) {
        user.quiz.meetPreferences[x] = { choice: null, required: false }
      }
    })

    this.meetPlaces.forEach(x => {
      if (!user.quiz.meetPlaces.hasOwnProperty(x)) {
        user.quiz.meetPlaces[x] = { choice: null, required: false }
      }
    })
  }

  ngOnInit(): void {
  }

  next() {
    let remaining = ''

    if (!this.user.quiz.minimumMatchPercent) {
      remaining = `${remaining}\nPlease choose how closely someone must match`
    }

    if (!this.user.quiz.legal.tos || !this.user.quiz.legal.disclaimer) {
      remaining = `${remaining}\nYou must accept both disclaimers`
    }

    if (remaining) {
      alert(remaining)
      return
    }

    this.router.navigate([ '/submitted' ])
  }
}
