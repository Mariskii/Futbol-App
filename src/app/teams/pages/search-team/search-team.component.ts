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
export class SearchTeamComponent implements OnInit{

  searchedTeams?:Team[];

  searchingTeams:boolean = false;

  itemsLeagues: ItemLeague[] = [
    {
      id: 39,
      title:'Premiere League',
      image:'https://seeklogo.com/images/P/premier-league-logo-FA8C79A1C0-seeklogo.com.png'
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

  public selectedLeagueId:number = 0;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    //Por defecto la primera liga de searchByLeagueId será la que muestre sus equipos
    this.onChangeLeague(this.itemsLeagues[0].id);
  }

  onChangeLeague(id: number) {

    this.searchedTeams = [];

    if(id !== this.selectedLeagueId) {

      this.searchingTeams = true;

      this.teamsService.searchByLeagueId(id)
      .subscribe(teamResponse =>
        {
          this.searchedTeams = teamResponse.response.map(team => team.team);
          this.searchingTeams = false;
        }
      );

      this.selectedLeagueId = id;

    }

  }
}
