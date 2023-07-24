import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  scenarios = [
    {
      text: 'Your friend is driving down the road when suddenly a rabbit jumps out in front of them.',
      choices: [
        'Slam on the brakes',
        'Try to hit the rabbit',
      ]
    }, {
      text: 'You tell your friend that you lost your job today.',
      choices: [
        'Give you a hug',
        'Shrug',
      ]
    }, {
      text: 'You already cooked food for your friend, but they don\'t eat the type of food you made for them.',
      choices: [
        'Tell you they actually don\'t eat this type of food',
        'Tell you they\'re actually not very hungry',
      ]
    }, {
      text: 'You and your friend are hiking in the woods, gun in hand, when suddenly a giant grizzly appears in the path ahead.',
      choices: [
        'Shoot the grizzly',
        'Try avoiding confrontation with the grizzly',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }, {
      text: '',
      choices: [
        '',
        '',
      ]
    }
  ]

  constructor() { }
}
