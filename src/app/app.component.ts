import {ChangeDetectorRef, Component} from '@angular/core';
import {Router, RouterEvent} from "@angular/router";
import { Location } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomepage = true

  constructor(private router: Router, public location: Location, private cr: ChangeDetectorRef) {
    router.events.subscribe(event => {
      if (event instanceof RouterEvent) {
        this.isHomepage = event.url === '/'
        this.cr.detectChanges()
      }
    })
  }
}
