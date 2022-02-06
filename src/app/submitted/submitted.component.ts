import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-submitted',
  templateUrl: './submitted.component.html',
  styleUrls: ['./submitted.component.scss']
})
export class SubmittedComponent implements OnInit {

  state: '' | 'success' | 'error' = ''
  error = ''

  constructor(public user: UserService, private api: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.user.token) {
      this.api.updateQuiz({
        token: this.user.token,
        quiz: this.user.quiz
      }).subscribe({
        next: () => this.state = 'success',
        error: err => {
          this.state = 'error'
          this.error = err.statusText
        }
      })
    } else {
      this.api.createQuiz({
        quiz: this.user.quiz
      }).subscribe({
        next: () => this.state = 'success',
        error: err => {
          this.state = 'error'
          this.error = err.statusText
        }
      })
    }
  }

  clear() {
    this.user.reset()
    this.router.navigate(['/'])
  }
}
