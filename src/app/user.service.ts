import { Injectable } from '@angular/core';
import {Quiz} from "./models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name: string = ''
  token: string = ''

  quiz = new Quiz()

  constructor() { }

  reset() {
    this.token = ''
    this.quiz = new Quiz()
  }
}

export interface Choice {
  choice: string | null,
  required: boolean
}
