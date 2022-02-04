import {Choice} from "./user.service";

class Model {
  id!: string
}

export class Quiz {
  name = ''
  city = ''
  geo = [] as Array<number>
  contact = ''
  distance = null as number | null
  personDetails = {
    gender: null as string | null,
    age: null as string | null,
    married: null as string | null,
    kids: null as string | null,
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
}

export class Attend extends Model {
  key = null as string | null
  meet = null as string | null
  skip = null as string | null
}

export class Place extends Model {
  meet = null as string | null
  attendees = null as number | null
}

export class Meet extends Model {
}

