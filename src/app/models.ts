import {Choice} from "./user.service";

class Model {
  id?: string
}

export class Quiz extends Model {
  name = ''
  city = ''
  geo = [] as Array<number>
  contact = ''
  distance = null as number | null
  personDetails = {
    gender: null as string | null,
    age: null as string | null,
    married: null as string | null,
    kids: [] as Array<String>,
    pets: null as string | null,
  }
  friendDetails = {
    genders: [] as Array<String>,
    ages: [] as Array<String>,
    married: [] as Array<String>,
    kids: [] as Array<String>,
    pets: [] as Array<String>,
    includeWhenAbsent: false
  }
  minimumSimilarity = 0
  friendFacts = {} as { [ key: string ]: Choice }
  friendScenarios = {} as { [ key: string ]: Choice }
  meetPreferences = {} as { [ key: string ]: Choice }
  meetPlaces = {} as { [ key: string ]: Choice }
  legal = {
    disclaimer: false,
    tos: false
  }
  paused = false
}

export class Attend extends Model {
  key!: string
  quiz!: string
  group!: string
  skip!: boolean
}

export class Confirm extends Model {
  meet!: string
  attend!: string
  response!: boolean
}


export class PlaceWithVotes {
  place!: Place
  voted!: boolean
  votes!: number
}

export class MeetWithAttendance {
  meet!: Meet
  place!: Place
  attendees!: number
  confirm?: Confirm
}

export class Place extends Model {
  group?: string
  name!: string
  address!: string
  date!: Date
  geo!: Array<number>
}

export class Meet extends Model {
}

