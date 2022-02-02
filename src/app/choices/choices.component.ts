import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Choice} from "../user.service";

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnInit {

  @Input() value!: Choice
  @Output() valueChange = new EventEmitter<Choice>()

  constructor() { }

  ngOnInit(): void {
  }

}
