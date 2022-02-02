import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {

  @Input() options = [] as Array<CheckboxOption>
  @Input() checked: null | any | Array<any>
  @Input() layout: 'row' | 'col' | 'odds' = 'row'
  @Input() multiple = false
  @Output() checkedChange = new EventEmitter<any | null>()

  constructor(private cr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.multiple && !this.checked) {
      this.checked = []
    }
  }

  changed(event: Event, option: CheckboxOption) {
    const v = option.value === undefined ? option.title : option.value
    const c = (event.target as HTMLInputElement).checked

    if (this.multiple) {
      const i = this.checked.indexOf(v)
      if (c && i === -1) {
        this.checked.push(v)
      } else {
        this.checked.splice(i, 1)
      }
    } else {
      if (c) {
        this.checked = v
      } else {
        this.checked = null
      }
    }

    this.checkedChange.next(this.checked)

    event.preventDefault()
    event.stopImmediatePropagation()

    this.cr.detectChanges()
  }
}

export class CheckboxOption {
  title!: string
  value?: any
}
