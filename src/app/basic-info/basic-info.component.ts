import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {MapService, PlaceResult} from "../map.service";
import {delay, Subscription} from "rxjs";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  citySuggestions = [] as Array<PlaceResult>

  private autocompleteSub?: Subscription
  private lastSearchText = ''

  constructor(public user: UserService, private map: MapService, private router: Router, private cr: ChangeDetectorRef) { }

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

    if (!this.user.quiz.contact) {
      remaining = `${remaining}\nPlease enter a phone number or email address`
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
}
