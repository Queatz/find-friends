import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  code = ''
  contact = ''
  codeSent = false
  idea = ''

  constructor(public user: UserService, private api: ApiService, private cr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
  }

  getQuiz() {
    if (!this.code) {
      return
    }

    this.api.getQuiz({
      contact: this.contact,
      code: this.code
    }).subscribe({
      next: response => {
        this.contact = ''
        this.cr.detectChanges()

        if (response.token && response.quiz) {
          this.user.token = response.token
          this.user.quiz = response.quiz
          this.router.navigate(['/begin'])
        } else {
          alert('Something went wrong')
        }
      },
      error: err => {
        this.cr.detectChanges()

        alert(err.statusText)
      }
    })

    this.code = ''
  }

  getCode() {
    if (!this.contact) {
      return
    }

    this.api.getCode({
      contact: this.contact
    }).subscribe({
      next: () => {
        this.codeSent = true
        this.cr.detectChanges()
      },
      error: err => {
        this.codeSent = false
        this.cr.detectChanges()

        alert(err.statusText)
      }
    })
  }
}
