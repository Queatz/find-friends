import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {MapService, PlaceResult} from "../map.service";
import {delay, Subscription} from "rxjs";
import {addHours, format, isAfter, isToday, isTomorrow, startOfToday} from "date-fns";
import {ActivatedRoute} from "@angular/router";
import {ApiService, MeetAttendanceApiResponse} from "../api.service";
import {MeetWithAttendance, PlaceWithVotes} from "../models";

@Component({
  selector: 'app-attend',
  templateUrl: './attend.component.html',
  styleUrls: ['./attend.component.scss']
})
export class AttendComponent implements OnInit {

  suggestions = [] as Array<PlaceWithVotes>

  days = [] as Array<DayOption>
  search = ''
  searchDate!: number
  searchName = ''
  searchGeo = [] as Array<number>
  searchAddress = ''
  searchMapImg = ''
  searchTime = '12:00'
  placeSuggestions = [] as Array<PlaceResult>
  meet?: MeetWithAttendance
  votedAlready = false
  unconfirmed = 0
  step?: 'vote' | 'confirm' | 'scheduled'

  meetMessage = ''

  result?: MeetAttendanceApiResponse
  error = ''

  loading = false
  private autocompleteSub?: Subscription
  private lastSearchText = ''

  constructor(public user: UserService, private api: ApiService, private map: MapService, private route: ActivatedRoute, private cr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.api.key = params.get('key')!

      this.load()

      this.cr.detectChanges()
    })

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

  addMeetSuggestion() {
    if (!this.searchName || !this.searchAddress || !this.searchGeo) {
      alert('Enter a place')
      return
    }

    if (!this.searchTime) {
      alert('Enter a time')
      return
    }

    const d = new Date(Number(this.searchDate))
    d.setHours(Number(this.searchTime.split(':')[0]))
    d.setMinutes(Number(this.searchTime.split(':')[1]))
    const date = this.time(d)

    const s = {
      id: Math.random().toString(),
      attendees: Math.floor(Math.random() * 4),
      date,
      voted: true,
      name: this.searchName,
      address: this.searchAddress,
      geo: this.searchGeo
    }

    this.searchDate = this.days[0].time
    this.searchName = ''
    this.searchGeo = []
    this.searchAddress = ''
    this.searchMapImg = ''
    this.searchTime = '12:00'

    this.api.createMeetPlace({
      place: {
        name: s.name,
        address: s.address,
        date: d,
        geo: s.geo,
      }
    }).subscribe({
      next: result => {
        // todo
      },
      error: err => {
        // todo
      }
    })
  }

  autocomplete(text: string) {
    this.autocompleteSub?.unsubscribe()

    if (!text || text === this.lastSearchText) {
      return
    }

    this.lastSearchText = text

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
    return this.map.staticMap(geo.join(','))
  }

  private fmt(date: Date): string {
    const t = isToday(date) ? 'Today' : isTomorrow(date) ? 'Tomorrow' : ''
    return t + format(date, `${ t ? '' : 'EEEE' }, MMMM do`)
  }

  time(date: Date | string): string {
    const d = date instanceof Date ? date : new Date(Date.parse(date as string))

    return `${format(d, 'h:mm a')}, ${this.fmt(d)}`
  }

  validateTime() {
    if (!this.searchTime) {
      this.searchTime = '12:00'
    }
  }

  load() {
    this.loading = true
    this.api.getMeet().subscribe({
      next: result => {
        this.user.name = result.name || ''

        this.loading = false

        this.setPlaces(result)

        this.cr.detectChanges()
      },
      error: err => {
        this.error = err.statusText
        this.loading = false

        this.cr.detectChanges()
      }
    })
  }

  vote(suggestion: PlaceWithVotes) {
    this.api.vote({
      place: suggestion.place.id
    }).subscribe({
      next: result => {
        this.setPlaces(result)

        this.cr.detectChanges()
      },
      error: err => {
        // todo
      }
    })
  }

  confirm(response: boolean) {
    this.api.confirm({
      meet: this.meet!.meet!.id,
      response: response
    }).subscribe({
      next: result => {
        this.setPlaces(result)

        this.cr.detectChanges()
      },
      error: err => {
        // todo
      }
    })
  }

  sendMeetMessage() {
    // todo
  }

  skipMeet() {
    this.api.skipMeet().subscribe({
      next: result => {
        this.setPlaces(result)

        this.cr.detectChanges()
      },
      error: err => {
        // todo
      }
    })
  }

  unskipMeet() {
    this.api.unskipMeet().subscribe({
      next: result => {
        this.setPlaces(result)

        this.cr.detectChanges()
      },
      error: err => {
        // todo
      }
    })
  }

  reportAProblem() {
    // todo
  }

  private setPlaces(meet: MeetAttendanceApiResponse) {
    this.result = meet

    this.meet =
      meet.meets?.find(x => x.confirm?.response === true) ??
      meet.meets?.find(x => x.confirm?.response !== false)

    this.votedAlready = !!meet.places!.find(x => x.voted)
    this.unconfirmed = this.result.attendees! - (meet.meets?.reduce((r, x) => r + x.attendees, 0) ?? 0)

    if (!this.meet) {
      this.step = 'vote'
    } else if (this.meet && !this.meet.confirm) {
      this.step = 'confirm'
    } else if (this.meet && this.meet.confirm?.response === true) {
      this.step = 'scheduled'
    } else {
      this.step = 'vote'
    }

    if (this.step === 'vote') {
      this.suggestions = meet.places!.filter(x => !meet.meets?.find(meet => x.place.id === meet.place.id))
    } else {
      this.suggestions = meet.meets?.map(it => ({ place: it.place } as PlaceWithVotes)) ?? []
    }
  }

  attendedAndPassed(meet?: MeetWithAttendance): boolean {
    return !!meet?.confirm?.response && isAfter(addHours(meet.place!.date, 1), new Date())
  }
}

interface DayOption {
  time: number
  text: string
}
