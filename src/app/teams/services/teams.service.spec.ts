import { TestBed } from '@angular/core/testing';

import { TeamsService } from './teams.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { TeamResponse } from '../interfaces/team.interface';
import { environment } from '../../../environments/environment.development';

const teamsServiceMock: TeamResponse = {
  results: 1,
  paging: { current: 1, total: 1 },
  response: [
    {
      team: {
        id: 1,
        name: 'Equipo 1',
        code: 'E1',
        country: 'País 1',
        founded: 2000,
        national: false,
        logo: 'logo-1.png'
      },
      venue: {
        id: 1,
        name: 'Estadio 1',
        address: 'Dirección 1',
        city: 'Ciudad 1',
        capacity: 10000,
        surface: 'Superficie 1',
        image: 'estadio-1.png'
      }
    }
  ]
};

describe('TeamsService', () => {

  let httpMock: HttpTestingController;
  let service: TeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TeamsService
      ]
    });

    service = TestBed.inject(TeamsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //Hace que no hayan peticiones pendientes entre cada test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchByLeagueId return a response of teams and does a get method', () => {

    service.searchByLeagueId(1).subscribe((response: TeamResponse) => {
      expect(response).toBe(teamsServiceMock)
    });

    const req = httpMock.expectOne('/teams?league=1&season=2023')

    //El test espera que el metodo de req sea de tipo GET
    expect(req.request.method).toBe('GET');
    req.flush(teamsServiceMock);
  });

  it('searchById return a response of teams and does a get method', () => {

    service.searchById(1,39).subscribe((response: TeamResponse) => {
      expect(response).toBe(teamsServiceMock)
    });

    const req = httpMock.expectOne('/teams?id=1&season=2023&league=39')

    expect(req.request.method).toBe('GET');
    req.flush(teamsServiceMock);
  });
});
