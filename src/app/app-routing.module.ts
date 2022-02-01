import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BasicInfoComponent} from "./basic-info/basic-info.component";
import {HomeComponent} from "./home/home.component";
import {FriendDetailsComponent} from "./friend-details/friend-details.component";
import {ScenariosComponent} from "./scenarios/scenarios.component";
import {MeetDetailsComponent} from "./meet-details/meet-details.component";
import {SubmittedComponent} from "./submitted/submitted.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'begin',
    component: BasicInfoComponent
  },
  {
    path: 'friend',
    component: FriendDetailsComponent
  },
  {
    path: 'scenarios',
    component: ScenariosComponent
  },
  {
    path: 'meet',
    component: MeetDetailsComponent
  },
  {
    path: 'submitted',
    component: SubmittedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
