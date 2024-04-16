import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedNavbarComponent } from '../../../shared/components/shared-navbar/shared-navbar.component';
import { TeamsService } from '../../services/teams.service';
import { Team, TeamResponse } from '../../interfaces/team.interface';
import { Observable, Subscription, fromEvent, map, tap } from 'rxjs';
import { ItemLeague } from '../../../shared/interfaces/item-league.interface';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrl: './search-team.component.css'
})
export class SearchTeamComponent{

  searchedTeams?:Team[];

  constructor(private teamsService: TeamsService) {}

  itemsLeagues: ItemLeague[] = [
    {
      id: 39,
      title:'Premiere League',
      image:'https://banner2.cleanpng.com/20180711/vg/kisspng-201617-premier-league-english-football-league-l-lion-emoji-5b460f06eeac18.5589169115313180229776.jpg'
    },
    {
      id: 140,
      title:'La liga',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/LaLiga_logo_2023.svg/1200px-LaLiga_logo_2023.svg.png'
    },
    {
      id: 61,
      title:'Ligue 1',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ligue1_Uber_Eats_logo.png/409px-Ligue1_Uber_Eats_logo.png'
    },
    {
      id: 135,
      title:'Serie A',
      image:'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/1193px-Serie_A_logo_2022.svg.png'
    },
    {
      id: 78,
      title:'Bundesliga',
      image:'https://www.fifplay.com/img/public/bundesliga-logo.png'
    }
  ];

  public selectedLeagueId:number = 39;

  onChangeLeague(id: number) {
    this.teamsService.searchByLeagueId(id)
      .pipe(
        tap(teamResponse => console.log(teamResponse))
      )
      .subscribe(teamResponse =>
        this.searchedTeams = teamResponse.response.map(team => team.team),
      );
  }
}
