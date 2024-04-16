import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTeamComponent } from './pages/search-team/search-team.component';
import { LayoutTeamsPageComponent } from './pages/layout-teams-page/layout-teams-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutTeamsPageComponent,
    children: [
      {path: 'search-teams', component: SearchTeamComponent},
      {path: '**', redirectTo: 'search-teams'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
