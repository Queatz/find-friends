import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name: String = ''

  quiz = {
    name: '',
    city: '',
    geo: [] as Array<number>,
    contact: '',
    distance: null,
    personDetails: {
      gender: null as string | null,
      age: null as string | null,
      married: null as string | null,
      kids: null as string | null,
      pets: null as string | null,
    },
    friendDetails: {
      genders: [] as Array<String>,
      ages: [] as Array<String>,
      married: [] as Array<String>,
      kids: [] as Array<String>,
      pets: [] as Array<String>,
      matchWhenAbsent: false
    },
    minimumMatchPercent: 0,
    friendFacts: {} as { [ key: string ]: Choice },
    friendScenarios: {} as { [ key: string ]: Choice },
    meetPreferences: {} as { [ key: string ]: Choice },
    meetPlaces: {} as { [ key: string ]: Choice },
    legal: {
      disclaimer: false,
      tos: false
    }
  }

  constructor() { }
}

export interface Choice {
  choice: string | null,
  required: boolean
}
