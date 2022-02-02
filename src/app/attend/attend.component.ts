import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {MapService, PlaceResult} from "../map.service";
import {delay, Subscription} from "rxjs";

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

  search = ''
  searchMapImg = ''
  placeSuggestions = [] as Array<PlaceResult>
  private autocompleteSub?: Subscription

  constructor(public user: UserService, private map: MapService, private cr: ChangeDetectorRef) { }

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

  autocomplete(text: string) {
    this.autocompleteSub?.unsubscribe()
    this.autocompleteSub = this.map.autocomplete(text, 'poi', this.user.quiz.geo.join(',')).pipe(delay(500)).subscribe(x => {
      this.placeSuggestions = x
      this.autocompleteSub = undefined

      this.cr.detectChanges()
    })
  }

  chooseAutocomplete(result: PlaceResult) {
    this.searchMapImg = this.map.staticMap(result.geo.join(','))
    this.placeSuggestions.length = 0
  }
}
