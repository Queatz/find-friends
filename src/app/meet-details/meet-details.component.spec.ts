import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetDetailsComponent } from './meet-details.component';

describe('MeetDetailsComponent', () => {
  let component: MeetDetailsComponent;
  let fixture: ComponentFixture<MeetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
