import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TeamResponse } from '../interfaces/team.interface';
import { environment } from '../../../environments/environment';
import { CacheStoreTeams } from '../interfaces/cache-store-team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  //La api solo tiene datos hasta el año anterior, no del actual, por lo que hay que restar un año
  private pastYear:number = new Date().getFullYear()-1;

  public cacheStore: CacheStoreTeams = {
    selectedLeagueId: 0,
    leagueTeams: []
  }

  constructor(private httpClient: HttpClient) { }

  searchByLeagueId(id: number):Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(`${environment.API_URL}/teams`, {
      headers:{
        'X-RapidAPI-Key':environment.API_KEY,
        'X-RapidAPI-Host': environment.API_HOST
      },
      params: {'league':id, 'season':this.pastYear}
    }).pipe(
      tap(response => {
        //Guardar los datos en cache
        this.cacheStore.selectedLeagueId = id;
        this.cacheStore.leagueTeams = response.response.map(team => team.team)
      })
    );
  }

  searchById(id: number, leagueId: number):Observable<TeamResponse> {
    return this.httpClient.get<TeamResponse>(`${environment.API_URL}/teams`, {
      headers:{
        'X-RapidAPI-Key':environment.API_KEY,
        'X-RapidAPI-Host': environment.API_HOST
      },
      params: {'id':id, 'season':this.pastYear, 'league':leagueId}
    });
  }
}
