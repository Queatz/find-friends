import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {MapService, PlaceResult} from "../map.service";
import {delay, Subscription} from "rxjs";
import {format, isToday, isTomorrow, startOfToday} from "date-fns";

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.scss']
})
export class AttendComponent implements OnInit {

  suggestions = [] as Array<Suggestion>

  meetChosen?: string
  timeIsExpired = false
  meetHasAlreadyBegun = false

  days = [] as Array<DayOption>
  search = ''
  searchDate!: number
  searchName = ''
  searchGeo = [] as Array<number>
  searchAddress = ''
  searchMapImg = ''
  searchTime = '12:00'
  placeSuggestions = [] as Array<PlaceResult>
  private autocompleteSub?: Subscription

  constructor(public user: UserService, private map: MapService, private cr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.days = [0, 1, 2, 3, 4, 5, 6].map(x => {
      const m = new Date(startOfToday().getTime() + x * 86400000)

      return {
        time: m.getTime(),
        text: this.fmt(m)
      }
    }).filter(x => {
      return !isToday(x.time) || new Date().getHours() < 18
    })
    this.searchDate = this.days[0].time
  }


  expired() {
    this.timeIsExpired = true
    this.suggestions.length = 0
  }

  addMeetSuggestion() {
    const d = new Date(Number(this.searchDate))
    d.setHours(Number(this.searchTime.split(':')[0]))
    d.setMinutes(Number(this.searchTime.split(':')[1]))
    const date = `${format(d, 'h:mm a')}, ${this.fmt(d)}`
    this.suggestions.push(
      {
        id: Math.random().toString(),
        attendees: 2,
        date,
        name: this.searchName,
        address: this.searchAddress,
        geo: this.searchGeo
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
    this.searchName = result.name
    this.searchAddress = result.address!
    this.searchGeo = result.geo
    this.placeSuggestions.length = 0
    this.search = ''
  }

  img(geo: Array<number>): string {
    return this.searchMapImg = this.map.staticMap(geo.join(','))
  }

  private fmt(date: Date): string {
    const t = isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : ''
    return t + format(date, `${ t ? '' : 'EEEE' }, MMMM do`)
  }
}

interface DayOption {
  time: number
  text: string
}

interface Suggestion {
  id: string
  name: string
  address: string
  date: string
  attendees: number
  geo: Array<number>
}
