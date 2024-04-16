import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { Team, Venue } from '../../interfaces/team.interface';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css'
})
export class TeamPageComponent implements OnInit {

  public team?: Team;
  public venue?: Venue;
  public resp ?: Response;

  constructor(
    //Para controlar los parametros de la URL
    private router: Router,
    private activatedRoute: ActivatedRoute,

    private teamsService: TeamsService
  ) {}

  ngOnInit(): void {
    this.getTeamFromUrlId()
  }

  getTeamFromUrlId() {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id, leagueIdteam}) => this.teamsService.searchById(id,leagueIdteam)),
        tap(t => console.log(t))
      )
      .subscribe( (teamResponse) => {
          if(!teamResponse) return this.router.navigateByUrl('');

          this.team = teamResponse.response[0].team;
          this.venue = teamResponse.response[0].venue;
          return;
      });
  }

}
