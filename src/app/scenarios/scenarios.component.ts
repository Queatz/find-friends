import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ScenarioService} from "../scenario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss']
})
export class ScenariosComponent implements OnInit {

  required = false
  id = 0

  constructor(public user: UserService, public scenario: ScenarioService, private route: ActivatedRoute, private router: Router, private cr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id')) - 1
      this.required = this.user.quiz.friendScenarios[this.id.toString()]?.required || false

      this.cr.detectChanges()
    })
  }

  select(text?: string): void {
    this.user.quiz.friendScenarios[this.id.toString()] = {
      choice: text || null,
      required: this.required
    }

    this.required = false

    if (this.id + 1 < this.scenario.scenarios.length) {
      this.router.navigate([ `/scenarios/${this.id + 1 + 1}` ])
    } else {
      this.router.navigate([ '/meet' ])
    }
  }
}
