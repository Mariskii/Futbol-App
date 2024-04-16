import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamResponse } from '../interfaces/team.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private httpClient: HttpClient) { }

  searchByLeagueId(id: number):Observable<TeamResponse> {

    //La api solo tiene datos hasta el año anterior, no del actual, por lo que hay que restar un año
    const pastYear:number = new Date().getFullYear()-1;

    return this.httpClient.get<TeamResponse>(`${environment.API_URL}/teams`, {
      headers:{
        'X-RapidAPI-Key':environment.API_KEY,
        'X-RapidAPI-Host': environment.API_HOST
      },
      params: {'league':id, 'season':pastYear}
    });
  }
}