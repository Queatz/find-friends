import { Injectable } from '@angular/core';
import {Quiz} from "./models";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  name: String = ''

  quiz = new Quiz()

  constructor() { }
}

export interface Choice {
  choice: string | null,
  required: boolean
}
