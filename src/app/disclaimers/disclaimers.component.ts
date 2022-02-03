import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-disclaimers',
  templateUrl: './disclaimers.component.html',
  styleUrls: ['./disclaimers.component.scss']
})
export class DisclaimersComponent implements OnInit {

  constructor(public user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  next() {
    let remaining = ''

    if (!this.user.quiz.legal.tos || !this.user.quiz.legal.disclaimer) {
      remaining = `${remaining}\nYou must accept both disclaimers to continue`
    }

    if (remaining) {
      alert(remaining)
      return
    }

    this.router.navigate([ '/begin' ])
  }
}
