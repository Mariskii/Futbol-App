import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { SearchTeamComponent } from './pages/search-team/search-team.component';


@NgModule({
  declarations: [
    SearchTeamComponent,
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule { }
