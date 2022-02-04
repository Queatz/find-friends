import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent implements OnInit {

  state: '' | 'success' | 'error' = ''

  constructor(public user: UserService, private api: ApiService) {
  }

  ngOnInit(): void {
    if (this.user.token) {
      this.api.updateQuiz({
        token: this.user.token,
        quiz: this.user.quiz
      }).subscribe({
        next: () => this.state = 'success',
        error: () => this.state = 'error'
      })
    } else {
      this.api.createQuiz({
        quiz: this.user.quiz
      }).subscribe({
        next: () => this.state = 'success',
        error: () => this.state = 'error'
      })
    }
  }
}
