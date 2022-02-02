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
    personDemographics: {
      gender: null as string | null,
      age: null as string | null
    },
    friendDemographics: {
      genders: [] as Array<String>,
      ages: [] as Array<String>,
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
