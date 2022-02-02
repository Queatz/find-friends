import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { HomeComponent } from './home/home.component';
import { FriendDetailsComponent } from './friend-details/friend-details.component';
import { ScenariosComponent } from './scenarios/scenarios.component';
import { MeetDetailsComponent } from './meet-details/meet-details.component';
import { SubmittedComponent } from './submitted/submitted.component';
import { AttendComponent } from './attend/attend.component';
import {FormsModule} from "@angular/forms";
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { ChoicesComponent } from './choices/choices.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    HomeComponent,
    FriendDetailsComponent,
    ScenariosComponent,
    MeetDetailsComponent,
    SubmittedComponent,
    AttendComponent,
    CheckboxGroupComponent,
    ChoicesComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
