import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { SearchTeamComponent } from './pages/search-team/search-team.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutTeamsPageComponent } from './pages/layout-teams-page/layout-teams-page.component';
import { SharedModule } from '../shared/shared.module';
import { TeamPageComponent } from './pages/team-page/team-page.component';


@NgModule({
  declarations: [
    SearchTeamComponent,
    LayoutTeamsPageComponent,
    TeamPageComponent,
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule { }
