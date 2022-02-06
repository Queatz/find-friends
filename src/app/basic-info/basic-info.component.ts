import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {MapService, PlaceResult} from "../map.service";
import {delay, Subscription} from "rxjs";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  citySuggestions = [] as Array<PlaceResult>

  showDeleteBox = false

  private autocompleteSub?: Subscription
  private lastSearchText = ''

  constructor(public user: UserService, private api: ApiService, private map: MapService, private router: Router, private cr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  next() {
    let remaining = ''

    if (!this.user.quiz.name) {
      remaining = `${remaining}\nPlease enter a first name`
    }

    if (!this.user.quiz.city) {
      remaining = `${remaining}\nPlease enter a city or town`
    } else if (!this.user.quiz.geo?.length) {
      remaining = `${remaining}\nThe entered city is invalid`
    }

    if (!this.user.quiz.distance) {
      remaining = `${remaining}\nPlease enter a maximum distance`
    }

    if (remaining) {
      alert(remaining)
      return
    }

    this.router.navigate(['/friend'])
  }

  autocomplete(text: string) {
    this.autocompleteSub?.unsubscribe()

    if (!text || text === this.lastSearchText) {
      return
    }

    this.lastSearchText = text

    this.autocompleteSub = this.map.autocomplete(text).pipe(delay(50)).subscribe(x => {
      this.citySuggestions = x

      this.autocompleteSub = undefined

      this.cr.detectChanges()
    })
  }

  chooseAutocomplete(result: PlaceResult) {
    this.user.quiz.city = `${result.name}, ${result.state}`
    this.user.quiz.geo = result.geo
    this.citySuggestions.length = 0
  }

  deactivate() {
    this.user.quiz.paused = true

    this.api.updateQuiz({
      token: this.user.token,
      quiz: this.user.quiz
    }).subscribe({
      error: err => {
        alert(err.statusText)
      }
    })
  }

  reactivate() {
    this.user.quiz.paused = false

    this.api.updateQuiz({
      token: this.user.token,
      quiz: this.user.quiz
    }).subscribe({
      error: err => {
        alert(err.statusText)
      }
    })
  }

  remove() {
    this.api.deleteQuiz(this.user.quiz.id!!, {
      token: this.user.token
    }).subscribe({
      next: () => {
        this.user.reset()
        alert('Your quiz has been deleted')
        this.router.navigate(['/'])
      },
      error: err => {
        alert(err.statusText)
      }
    })
  }
}
